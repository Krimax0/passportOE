import {useEffect, useRef, useState} from "react";
import {useRouter} from 'next/router'

import axios from 'axios';
import renderCanvas from "../tools/renderCanvas";
import ImgMass from './CanvasItems'
import s from './canvas.module.scss'
import env from "../env";

const badges = ImgMass.badges
const backgrounds = ImgMass.backgrounds
const namesBackgrounds = ImgMass.namesBackgrounds
const banners = ImgMass.banners
const publicBanners = ImgMass.publicBanners
const isDev = process.env.NODE_ENV === 'dev'


function Canvas() {

    let areas = {
        background: '/backgrounds/everyone/1.jpg',
        avatar: null,
        text: [
            null, '', ''
        ],
        whiteText: false,
        friends: [],
        banner: [0, 0],
        flipBanner: [false, false],
        bigBadges: [0, 0],
        badge: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] // 20 обьектов
    }
    // Глобальные значения
    const [value, setValue] = useState(0)
    const [changed, setChanged] = useState(null)
    const [editPassport, setEditPassport] = useState([false, false, false, false])
    const [downloadPassport, setDownloadPassport] = useState(false)

    // Задний фон
    const [imageBackground, setImageBackground] = useState(backgrounds[0])
    const [valueBackground, setValueBackground] = useState(0)
    const [categoryBackground, setCategoryBackground] = useState(0)


    // Баннеры
    const [valueBanner, setValueBanner] = useState([null, null])
    const [flipBanner, setFlipBanner] = useState([false, false])
    const [listItemBanners, setListItemBanners] = useState(0)
    const [categoryBanners, setCategoryBanners] = useState(0)
    const [pickPlaceBanner, setPickPlaceBanner] = useState(0)

    // Стейты которые касаются только обычных значков
    const [valueBadges, setValueBadges] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [categoryBadges, setCategoryBadges] = useState(0)
    const [listItemBadges, setListItemBadges] = useState(0)
    const [pickPlaceBadge, setPickPlaceBadge] = useState(0) //Выбранный слот для изменения

    // Большие значки
    const [valueBigBadges, setValueBigBadges] = useState([0, 0])
    const [pickPlaceBigBadge, setPickPlaceBigBadge] = useState(0)

    // Данные пользователя
    const [avatar, setAvatar] = useState(areas.avatar)
    const [username, setUsername] = useState(areas.text[0])
    const [userId, setUserId] = useState()
    const [dateJoin, setDateJoin] = useState('')
    const [about, setAbout] = useState('')
    const [friendList, setFriendList] = useState([])

    // Поисковые
    const [trueReq, setTrueReq] = useState(true)
    const [peopleList, setPeopleList] = useState([])
    const [search, setSearch] = useState('')
    const [reqSearch, setReqSearch] = useState(false)
    const [loadingPeopleList, setLoadingPeopleList] = useState(true)
    const [errorLoadingPeopleList, setErrorLoadingPeopleList] = useState(false)

    const backUrl = process.env.NODE_ENV === 'production' ? `${env.Address}/api/handler` : `${env.localAddress}/handler`

    const getReq = async (TypeReq, amount = 20, search) => {
        if (TypeReq === 'GET_USER') {
            return await axios.post(backUrl, // `https://passportoe.ru/api/handler`,
                {
                    type: 'GET_USER',
                    data: {
                        "amountUsers": amount,
                        "searchUser": search
                    }
                }
            )
        } else if (TypeReq === 'GET_RANDOM_USER') {
            return await axios.post(backUrl,
                {
                    type: 'GET_RANDOM_USER',
                    data: {
                        "amountUsers": amount
                    }
                }
            )
        }
    }

    const GetUsersList = async (massUsersId) => {
        // massUsersId - массив наполненный userId, которые находятся ИМЕННО в формате чисел а не строки
        return await axios.post(backUrl,
            {
                type: 'GET_USERS_LIST',
                data: {
                    id: massUsersId
                }
            }
        )
    }

    const router = useRouter()

    const urlId = `${router.query.id}`
    useEffect(async () => {
        if (!window) {
            return null
        }
        const LocalGetItem = (name) => {
            return JSON.parse(localStorage.getItem(name))
        }

        const localStorageData = {
            avatar: LocalGetItem('Avatar'),
            username: LocalGetItem('Username'),
            dataJoin: LocalGetItem('DateJoin'),
            userId: LocalGetItem('UserId'),
            about: LocalGetItem('About'),
            backgroundImg: LocalGetItem('BackgroundImg'),
            backgroundValue: LocalGetItem('BackgroundValue'),
            valueBanner: LocalGetItem('BannerValue'),
            flipBanner: LocalGetItem('FlipBanners'),
            valueBigBadges: LocalGetItem('BigBadgesValue'),
            valueBadges: LocalGetItem('BadgesValue'),
            friendList: LocalGetItem('FriendList')
        }
        if (
            localStorageData.avatar !== null &&
            localStorageData.username !== null &&
            localStorageData.dataJoin !== null &&
            localStorageData.userId !== null
        ) {
            // Востановление прошлого state после перезагрузки страницы
            setAvatar(localStorageData.avatar)
            areas.avatar = localStorageData.avatar
            setUsername(localStorageData.username)
            setDateJoin(localStorageData.dataJoin)
            setUserId(localStorageData.userId)
            setAbout(localStorageData.about)
            setImageBackground(localStorageData.backgroundImg)
            setValueBackground(localStorageData.backgroundValue)
            setValueBanner(localStorageData.valueBanner)
            setFlipBanner(localStorageData.flipBanner)
            setValueBigBadges(localStorageData.valueBigBadges)
            setValueBadges(localStorageData.valueBadges)
            checkAvatarUser(localStorageData.friendList)
        }

    }, [urlId])

    //Удаляет одинаковые значения
    function uniq_fast(a) {
        let seen = {};
        let out = [];
        let len = a.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            let item = a[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
            }
        }
        return out;
    }

    useEffect(() => {
        console.log(`О себе: ${about}`)
        localStorage.setItem('About', JSON.stringify(about))

        const goAbout = about
        const timer = setTimeout(() => {
            if (goAbout === about) {
                rerender()
            }
        }, 1500);
        return () => clearTimeout(timer);

    }, [about])
    useEffect(() => {
        console.log(`Номер заднего фона: ${valueBackground}, картинка: ${imageBackground}`)
        localStorage.setItem('BackgroundImg', JSON.stringify(imageBackground))
        localStorage.setItem('BackgroundValue', JSON.stringify(valueBackground))
    }, [imageBackground, valueBackground])
    useEffect(() => {
        console.log(`Номер баннера:${valueBanner}`)
        localStorage.setItem('BannerValue', JSON.stringify(valueBanner))
    }, [valueBanner[0], valueBanner[1]])
    useEffect(() => {
        console.log(`Развернутые банеры: ${flipBanner}`)
        localStorage.setItem('FlipBanners', JSON.stringify(flipBanner))
    }, [flipBanner[0], flipBanner[1]])
    useEffect(() => {
        console.log(`Номер большого значка:${valueBigBadges}`)
        localStorage.setItem('BigBadgesValue', JSON.stringify(valueBigBadges))
    }, [valueBigBadges[0], valueBigBadges[1]])
    useEffect(() => {
        console.log(`Номер значка:${valueBadges}`)
        localStorage.setItem('BadgesValue', JSON.stringify(valueBadges))
    }, [JSON.stringify(valueBadges)])
    useEffect(() => {
        //console.log(`Изменение друзей`)
        /*

            Крч смотри, проблема в том что запись в localStorage осуществляется быстрее нежели придут данные которые нужно записать

        */
        rerender()
    }, [JSON.stringify(friendList)])
    useEffect(() => {
        setCategoryBadges(numberBadgesCategories(0))
    }, [listItemBadges])
    useEffect(() => {
        setCategoryBanners(numberBannersCategories(0))
    }, [listItemBanners])
    useEffect(() => {
        setPeopleList([])
        setLoadingPeopleList(true)
        setErrorLoadingPeopleList(false)
        const goSearch = search
        const timer = setTimeout(() => {
            if (goSearch === search) {
                setReqSearch(true)
                setLoadingPeopleList(false)
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [search])

    const canvasRef = useRef(null)
    const downloadLink = useRef(null)
    //Чтобы, сделать скачивание файла нужно будет сделать чтобы при нажатии "Скачать", вылезало окошко о подтверждении действия
    //Вопрос состоит в том как сделать это окошко кросс браузерным, на телефоне могут быть траблы, жесть я даун конечно
    //Это решается намного легче, всего лишь нужно создать невидимый тег <a></a> на который будет
    //совершаться нажатие функцией

    const downloadCanvas = () => {

        downloadLink.current.download = 'passportOE.jpeg'
        downloadLink.current.href = canvasRef.current.toDataURL("image/jpeg")
        downloadLink.current.click()
    }

    //Ооо~~~птииимизацияяяяяя, УДАЛИТЬ НЕМЕДЛЕНО ПОСЛЕ ВЫПОЛНЕНИЯ ВВЕРХНЕГО КОМЕНТА
    /*setTimeout(() => {
        setTestState()
    }, 2000)*/

    useEffect(() => {
        renderCanvas(canvasRef.current, areas, editPassport, setEditPassport).then(() => {
            console.log('Рисовка')
        })

    }, [changed])
    const rerender = () => {
        setChanged(changed + 1)
    }
    areas.background = imageBackground

    areas.avatar = avatar
    areas.text[0] = username
    if (dateJoin) {
        areas.text[1] = dateJoin
    }
    areas.text[2] = about
    if (
        valueBackground === 6 ||
        valueBackground === 8 ||
        valueBackground === 10 ||
        valueBackground === 14 ||
        valueBackground === 20 ||
        valueBackground === 27 ||
        valueBackground === 28 ||
        valueBackground === 31 ||
        valueBackground === 32 ||
        valueBackground === 33 ||
        valueBackground === 35 ||
        valueBackground === 43 ||
        valueBackground === 44 ||
        valueBackground === 46 ||
        valueBackground === 47
    ) {
        areas.whiteText = true
    }
    areas.banner[0] = banners[valueBanner[0]]
    areas.banner[1] = banners[valueBanner[1]]
    areas.flipBanner[0] = flipBanner[0]
    areas.flipBanner[1] = flipBanner[1]
    areas.bigBadges[0] = badges[valueBigBadges[0]]
    areas.bigBadges[1] = badges[valueBigBadges[1]]
    for (let i = 0; i < 20; i++) {
        areas.badge[i] = badges[valueBadges[i]]
    }
    for (let i = 0; i < friendList.length; i++) {
        areas.friends[i] = friendList[i].avatar
    }

    if (uniq_fast(valueBadges).length > 5) {
        if (editPassport[0] === false) {
            editPassport[0] = true
            setEditPassport(editPassport)
        }
    } else if (uniq_fast(valueBadges).length <= 5) {
        if (editPassport[0] === true) {
            editPassport[0] = false
            setEditPassport(editPassport)
        }
    }
    // Код по зачислению выполнения задания при наличии мин колва слов
    // было изменено на минимальное количество строк(3 строки)
    // проверка находится в renderCanvas

    if (valueBanner[0] !== null && valueBanner[1] !== null) {
        if (editPassport[2] === false) {
            editPassport[2] = true
            setEditPassport(editPassport)
        }
    } else if (valueBanner[0] === null || valueBanner[1] === null) {
        if (editPassport[2] === true) {
            editPassport[2] = false
            setEditPassport(editPassport)
        }
    }
    if (valueBigBadges[0] !== 0 && valueBigBadges[1] !== 0) {
        if (editPassport[3] === false) {
            editPassport[3] = true
            setEditPassport(editPassport)
        }
    } else if (valueBigBadges[0] === 0 || valueBigBadges[1] === 0) {
        if (editPassport[3] === true) {
            editPassport[3] = false
            setEditPassport(editPassport)
        }
    }
    if (editPassport[0] === true && editPassport[1] === true && editPassport[2] === true && editPassport[3] === true) {
        if (downloadPassport === false) {
            setDownloadPassport(true)
        }
    } else if (editPassport[0] !== true || editPassport[1] !== true || editPassport[2] !== true || editPassport[3] !== true) {
        if (downloadPassport === true) {
            setDownloadPassport(false)
        }
    }

    const numberBadgesCategories = (number) => {
        let value = listItemBadges + number
        if (value < 0) {
            for (let i = -1; ;) {
                value += 22
                if (i < value) {
                    return value
                }
            }
        } else if (value > 21) {
            for (let i = 22; ;) {
                value -= 22
                if (i > value) {
                    return value
                }
            }
        }
        return value
    }

    const numberBannersCategories = (number) => {
        let value = listItemBanners + number
        if (value < 0) {
            for (let i = -1; ;) {
                value += 8
                if (i < value) {
                    return value
                }
            }
        } else if (value > 7) {
            for (let i = 8; ;) {
                value -= 8
                if (i > value) {
                    return value
                }
            }
        }
        return value
    }
    const BannerCategories = () => {
        const listCategoriesBanners = [
            'Доступно всем',
            'Творчество',
            'Магазин',
            'Праздники',
            'Сезоны',
            'Старый магазин',
            'Лимитки',
            'Ивенты'
        ]
        return (
            <div className={s.list_section}>
                <div className={s.section_text}>
                    <div className={s.leftItem} onClick={() => {
                        setListItemBanners(listItemBanners - 1)
                    }}>
                        {listCategoriesBanners[numberBannersCategories(-1)]}
                    </div>
                </div>

                <div className={s.section_img} onClick={() => setListItemBanners(listItemBanners - 1)}>
                    <img
                        src={'/LeftArrow.png'}
                        className={s.leftArrow}
                        alt="1"/>
                </div>

                <div className={s.section_text}>
                    <div className={s.main_item}>
                        {listCategoriesBanners[numberBannersCategories(0)]}
                    </div>
                </div>

                <div className={s.section_img} onClick={() => setListItemBanners(listItemBanners + 1)}>
                    <img
                        src={'/RightArrow.png'}
                        className={s.rightArrow}
                        alt="1"/>
                </div>
                <div className={s.section_text}>
                    <div className={s.rightItem} onClick={() => {
                        setListItemBanners(listItemBanners + 1)
                    }}>
                        {listCategoriesBanners[numberBannersCategories(+1)]}
                    </div>
                </div>
            </div>
        )
    }

    const Categories = (value) => {
        const listCategoriesBadges = [
            'Доступные всем', //1
            'Турниры', //2
            'Ивенты', //3
            'Магазин', //4
            'Творцы', //5
            'Хеллоуин', //6
            'Новый год', //7
            'Сезоны', //8
            'Лапки', //9
            'Кооп', //10
            'Старый Магазин', //11
            'Лимитированные', //12
            'Баллы', //13
            '"Я был"', //14
            'Стримы', //15
            'Старые побочные', //16
            'Сообщения', //17
            'Поддержка', //18
            'Достижения', //19
            'Праздники', //20
            'Аниме раздел', //21
            'Рейтинг', //22
        ]
        if (value === 'background') {
            return (
                <div className={s.navbar}>
                    <div className={s.big_name}>
                        Категории
                    </div>
                    <div className={categoryBackground === 0 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(0)}>
                        Доступные всем
                    </div>
                    <div className={categoryBackground === 1 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(1)}>
                        Творчество
                    </div>
                    <div className={categoryBackground === 2 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(2)}>
                        Магазин
                    </div>
                    <div className={categoryBackground === 3 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(3)}>
                        Праздники
                    </div>
                    <div className={categoryBackground === 4 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(4)}>
                        Баллы
                    </div>
                    <div className={categoryBackground === 5 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(5)}>
                        Сезоны
                    </div>
                    <div className={categoryBackground === 6 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(6)}>
                        Старый магазин
                    </div>
                    <div className={categoryBackground === 7 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(7)}>
                        Помощь империи
                    </div>
                    <div className={categoryBackground === 8 ? s.itemActive : s.item}
                         onClick={() => setCategoryBackground(8)}>
                        Ивенты
                    </div>
                </div>
            )
        } else if (value === 'badges') {
            return (
                <div>
                    <div className={s.list_section}>
                        <div className={s.section_text}>
                            <div className={s.leftItem} onClick={() => {
                                setListItemBadges(listItemBadges - 1)
                            }}>
                                {listCategoriesBadges[numberBadgesCategories(-1)]}
                            </div>
                        </div>

                        <div className={s.section_img}
                             onClick={() => setListItemBadges(listItemBadges - 1)}>
                            <img
                                src={'/LeftArrow.png'}
                                className={s.leftArrow}
                                alt="1"/>
                        </div>

                        <div className={s.section_text}>
                            <div className={s.main_item}>
                                {listCategoriesBadges[numberBadgesCategories(0)]}
                            </div>
                        </div>

                        <div className={s.section_img}
                             onClick={() => setListItemBadges(listItemBadges + 1)}>
                            <img
                                src={'/RightArrow.png'}
                                className={s.rightArrow}
                                alt="1"/>
                        </div>
                        <div className={s.section_text}>
                            <div className={s.rightItem} onClick={() => {
                                setListItemBadges(listItemBadges + 1)
                            }}>
                                {listCategoriesBadges[numberBadgesCategories(+1)]}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (value === 'bigBadges') {
            return (
                <div>
                    <div className={s.list_section}>
                        <div className={s.section_text}>
                            <div className={s.leftItem} onClick={() => {
                                setListItemBadges(listItemBadges - 1)
                            }}>
                                {listCategoriesBadges[numberBadgesCategories(-1)]}
                            </div>
                        </div>

                        <div className={s.section_img}
                             onClick={() => setListItemBadges(listItemBadges - 1)}>
                            <img
                                src={'/LeftArrow.png'}
                                className={s.leftArrow}
                                alt="1"/>
                        </div>

                        <div className={s.section_text}>
                            <div className={s.main_item}>
                                {listCategoriesBadges[numberBadgesCategories(0)]}
                            </div>
                        </div>

                        <div className={s.section_img}
                             onClick={() => setListItemBadges(listItemBadges + 1)}>
                            <img
                                src={'/RightArrow.png'}
                                className={s.rightArrow}
                                alt="1"/>
                        </div>
                        <div className={s.section_text}>
                            <div className={s.rightItem} onClick={() => {
                                setListItemBadges(listItemBadges + 1)
                            }}>
                                {listCategoriesBadges[numberBadgesCategories(+1)]}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const itemsBackgrounds = [];

    let currentIndex = 0;
    const itemsPerGroup = [4, 10, 2, 11, 6, 6, 4, 2, 3];

    for (let i = 0; i < itemsPerGroup.length; i++) {
        const group = [];

        for (let j = 0; j < itemsPerGroup[i]; j++) {
            const itemIndex = currentIndex + j;

            group.push({
                id: itemIndex,
                name: namesBackgrounds[itemIndex],
                image: backgrounds[itemIndex]
            });
        }

        itemsBackgrounds.push(group);
        currentIndex += itemsPerGroup[i];
    }
    const pickBackground = (value) => {
        return itemsBackgrounds[value].map((el) => {
            return (
                <div
                    className={s.item}
                    ref={OneElBackground}
                    id={el.id}
                    onClick={() => setBackground(el.id)}
                >
                    <div className={s.name_item}>{el.name}</div>
                    <div className={s.image_item}>
                        {valueBackground === el.id ? (
                            <div>
                                <img src={el.image} className={s.pick_img} alt={el.id} />
                                <img
                                    src={'/GreenAccess.png'}
                                    className={s.mark}
                                    alt={el.id}
                                />
                            </div>
                        ) : (
                            <div>
                                <img src={el.image} className={s.img} alt={el.id} />
                                <div className={s.invisible_text}>Просмотр</div>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    const UserAvatar = (userId, avatarId) => {
        if (avatarId !== null) {
            return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png?size=128`
        } else {
            return `/defaultAvatars/${Math.ceil(Math.random() * 6) - 1}.png`
        }
    }
    const addFriend = async (el) => {
        console.log(el)
        if (el.avatar === '/defaultAvatars/0.png' ||
            el.avatar === '/defaultAvatars/1.png' ||
            el.avatar === '/defaultAvatars/2.png' ||
            el.avatar === '/defaultAvatars/3.png' ||
            el.avatar === '/defaultAvatars/4.png' ||
            el.avatar === '/defaultAvatars/5.png') {

            let defaultAvatar = `/defaultAvatars/${Math.ceil(Math.random() * 6) - 1}.png`


            setFriendList([
                ...friendList,
                {
                    id: el.id,
                    name: el.name,
                    hash: el.hash,
                    avatar: defaultAvatar
                }
            ])
        } else {
            let req = await fetch(el.avatar) //Закрыт доступ cors от дискорда

            console.log(req.status)
            if (req.status === 404) {
                setFriendList([
                    ...friendList,
                    {
                        id: el.id,
                        name: el.name,
                        hash: el.hash,
                        avatar: UserAvatar(el.id, null)
                    }
                ])
            } else {
                setFriendList([
                    ...friendList,
                    {
                        id: el.id,
                        name: el.name,
                        hash: el.hash,
                        avatar: el.avatar
                    }
                ])
            }
        }
    }
    const Search = async () => {
        if (search) {
            console.log('Поиск пользователя')
            const res = await getReq("GET_USER", 20, search)
            const users = res.data.users
            console.log(users)
            console.log(res)
            console.log(search === res.data.searchData)
            if (search === res.data.searchData) {

                await setPeopleList([])
                const mass = []

                if (users[0]) {
                    users.map((user) => {
                        let avatar = UserAvatar(user.userId, user.avatar)
                        let userTable = {
                            id: user.userId,
                            name: user.nickname,
                            hash: user.hash,
                            avatar: avatar
                        }
                        mass.push(userTable)
                        setPeopleList(mass)
                    })
                } else {
                    setErrorLoadingPeopleList(true)
                }
            }
        } else {
            setTrueReq(true)
        }
    }
    const checkAvatarUser = async (value) => {
        if (JSON.stringify(value) === '[]') return

        const mass = []
        const massId = []

        const func = (mas, massId, value1) => {
            console.log(value1)
            value1.map(async (el) => {
                console.log(el.id)
                const id = el.id
                if (id) {
                    if (typeof id === "number") {
                        massId.push(`${id}`)
                    } else if (typeof id === "string") {
                        massId.push(id)
                    }
                    console.log(`Поиск пользователя по id: ${id}`)
                } else {
                    console.log('Пришел пустой id пользователя из localStorage')
                }
            })
        }
        await func(mass, massId, value)
        const getUser1 = async (massId, mas) => {
            const getUsers = await GetUsersList(massId)
            getUsers.data.map(async (user) => {
                if (user) {
                    const el = {}
                    el.avatar = UserAvatar(user.userId, user.avatar)
                    el.hash = user.hash
                    el.id = user.userId
                    el.name = user.nickname
                    let req = await fetch(el.avatar)

                    if (req.status !== 404) {
                        mas.push({
                            id: el.id,
                            name: el.name,
                            hash: el.hash,
                            avatar: el.avatar
                        })
                    } else {
                        mas.push({
                                id: el.id,
                                name: el.name,
                                hash: el.hash,
                                avatar: UserAvatar(el.id, null)
                            }
                        )
                    }
                }
            })
        }
        await getUser1(massId, mass).then(() => {
            setFriendList(mass)
            console.log(mass)
            rerender()
        })
        setTimeout(() => {
            rerender()
            console.log('Перерисовка для применения всех изменений')
        }, 2000)
    }

    const noFriendsList = () => {
        if (reqSearch) {
            setReqSearch(false)
            Search().catch(console.error)
            return null
        }

        if (trueReq) {
            // Срабатывает только 1 раз, чтобы отправить 1 запрос
            // Сделать перезагрузку пользователей, когда выходишь в выбор полей и обратно в поле друзей
            // При очищении текстового поля будет заново отправляться запрос на рандомных пользователей
            // Надо сделать так что когда вводишь в текстовое поле, весь массив peopleList очищался, и заполнялся
            // данными о найденных совпадениях
            // Дедлайны горят Мамочка помоги,

            setTrueReq(false)
            getReq("GET_RANDOM_USER", 50).then((res) => {
                setLoadingPeopleList(false)
                setPeopleList([])

                res.data.users.map((el) => {
                    let avatar = UserAvatar(el.userId, el.avatar)
                    setPeopleList(peopleList => ([
                        ...peopleList,
                        {
                            id: el.userId,
                            name: el.nickname,
                            hash: el.hash,
                            avatar: avatar
                        }
                    ]))
                })
            })
        }

        return peopleList.map((el) => {
            for (let i = 0; i < friendList.length; i++) {
                if (el.id === friendList[i].id) {
                    return (<></>)
                }
            }
            return (
                <div className={s.item_user} onClick={() => {
                    addFriend(el)
                }}>
                    <img src={el.avatar}
                         onError={(ev) => ev.target.src = UserAvatar(el.id, null)}
                         alt={el.id} className={s.user_avatar}/>

                    <div className={s.name_section}>
                        <div className={s.name}>{el.name}</div>
                        <div className={s.hash}>#{el.hash}</div>
                    </div>
                    <div className={s.invisible_text}>
                        Добавить
                    </div>
                </div>
            )
        })
    }
    const [pickFriend, setPickFriend] = useState([])
    const [isSelectAll, setIsSelectAll] = useState(false)

    const removeFriend = (value) => {
        for (let i = 0; i < friendList.length; i++) {
            if (value === friendList[i].id) {
                friendList.splice(i, 1)

                setFriendList([
                    ...friendList
                ])
                return
            }
        }
    }
    const DeletingSelectedUsers = async () => {
        pickFriend.map((id) => {
            removeFriend(id)
        })
        setPickFriend([])
        setIsSelectAll(false)
    }
    const AllSelectFriends = () => {
        // Выделение всех пользователей
        if (isSelectAll === false) {
            setPickFriend([])
            friendList.map((el) => {
                pickFriend.push(el.id)
                setPickFriend(pickFriend)
            })
            setIsSelectAll(true)
        } else if (isSelectAll === true) { // Убирание всех выделенных пользователей
            setPickFriend([])
            setIsSelectAll(false)
        }
    }
    const pointFriend = (id) => {
        if (pickFriend.findIndex((i) => i === id) === -1) {
            setPickFriend([...pickFriend, id])
        } else {
            const index = pickFriend.findIndex((i) => i === id)
            pickFriend.splice(index, 1)
            setPickFriend([...pickFriend])
        }
    }
    const friendListDisplay = () => {
        return friendList.map((el) => {
            if (el !== undefined) {
                return (
                    <div className={s.item_user} onClick={() => pointFriend(el.id)}>
                        <img className={s.user_avatar} src={el.avatar} alt={el.id}/>
                        <div className={s.username}>{el.name}</div>
                        <div className={s.hash}>#{el.hash}</div>
                        <div className={s.pick_out}>
                            <div className={s.outline}>
                                <div className={pickFriend.findIndex((i) => i === el.id) !== -1 ? s.point : s.noPoint}/>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <></>
            }
        })

        /*return friendList.map((el) => {
            if (el !== undefined) {
                return (
                    <div className={s.item_user}>
                        <img className={s.user_avatar} src={el.avatar} alt={el.id}/>
                        <div className={s.username}>{el.name}</div>
                        <div className={s.hash}>{el.hash}</div>
                        <div className={s.invisible_text} onClick={() => removeFriend(el.id)}>Удалить</div>
                    </div>
                )
            } else {
                return <></>
            }
        })*/
    }
    const pickPlace = (value) => {
        if (value === 'badges') {
            const element = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            const bruh = element.map((el) => {
                return (
                    <div className={pickPlaceBadge === el ? s.itemActive : s.item}
                         onClick={() => setPickPlaceBadge(el)}>
                        <div className={s.standard}>
                            {valueBadges[el] !== 0 ?
                                <img
                                    src={areas.badge[el]}
                                    className={s.pick_img}
                                    alt={'1'}/>
                                :
                                <img
                                    src={'/backfor.png'}
                                    className={s.img}
                                    alt={'1'}/>
                            }
                        </div>

                        <div className={s.hover_img}>
                            <img
                                src={'/plus.png'}
                                className={s.img}
                                alt={'1'}/>
                        </div>
                    </div>
                )
            })
            return (
                <div className={s.pick_place}>
                    {bruh}
                </div>
            )
        } else if (value === 'bigBadges') {
            const element = [0, 1]
            const bruh = element.map((el) => {
                return (
                    <div className={pickPlaceBigBadge === el ? s.itemActive : s.item}
                         onClick={() => setPickPlaceBigBadge(el)}>
                        <div className={s.standardBigBadges}>
                            {valueBigBadges[el] !== 0 ?
                                <img
                                    src={areas.bigBadges[el]}
                                    className={s.pick_img}
                                    alt={'1'}/>
                                :
                                <img
                                    src={'/backfor.png'}
                                    className={s.img}
                                    alt={'1'}/>
                            }
                        </div>
                        <div className={s.hover_img}>
                            <img
                                src={'/plus.png'}
                                className={s.img}
                                alt={'1'}/>
                        </div>
                    </div>
                )
            })
            return (
                <div className={s.pick_place}>
                    {bruh}
                </div>
            )
        } else if (value === 'banners') {
            const element = [0, 1]
            const bruh = element.map((el) => {
                return (
                    <div>
                        <div className={flipBanner[el] ? s.bnrButtonSectionActive : s.bnrButtonSection}
                             onClick={() => {
                                 rerender()
                                 flipBanner[el] = !flipBanner[el]
                                 setFlipBanner(flipBanner)
                             }}>

                            <div className={flipBanner[el] ? s.textBnrButtonActive : s.textBnrButton}>
                                Отзеркалить
                            </div>

                            <img
                                src={flipBanner[el] ?
                                    '/checkboxOn.png'
                                    :
                                    '/checkboxOff.png'
                                }
                                alt={"checkboxBnrButton"}
                                className={s.checkboxBnrButton}/>

                        </div>
                        <div className={pickPlaceBanner === el ? s.itemActive : s.item}
                             onClick={() => setPickPlaceBanner(el)}>
                            <div className={s.standard}>
                                {valueBanner[el] !== null ?
                                    <img
                                        src={areas.banner[el]}
                                        className={flipBanner[el] ? s.pick_imgMirror : s.pick_img}
                                        alt={'Не пустой баннер'}/>
                                    :
                                    <img
                                        src={'/nullBanner.png'}
                                        className={s.img}
                                        alt={'Пустой баннер'}/>
                                }
                            </div>
                            <div className={s.hover_img}>
                                <img
                                    src={'/plus.png'}
                                    className={s.img}
                                    alt={'Баннер при наведении'}/>
                            </div>
                        </div>
                    </div>
                )
            })
            return (
                <div className={s.pick_place}>
                    {bruh}
                </div>
            )
        }
    }
    const changeBanner = (value) => {
        valueBanner[pickPlaceBanner] = value
        setValueBanner(valueBanner)
        rerender()
    }
    const Banners = () => {
        const bannersItem = publicBanners[categoryBanners].map((el) => {
            if (el.id === publicBanners[categoryBanners][0].id) {
                return (
                    <div className={s.item} ref={OneElBanner} id={el.id} onClick={() => changeBanner(el.id)}>
                        <div className={s.item_section_img}>
                            <img src={el.image}
                                 className={s.item_img}
                                 title={el.name}
                                 alt={el.id}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className={s.item} id={el.id} onClick={() => changeBanner(el.id)}>
                        <div className={s.item_section_img}>
                            <img src={el.image}
                                 className={s.item_img}
                                 title={el.name}
                                 alt={el.id}/>
                        </div>
                    </div>
                )
            }
        })

        return (
            <div className={s.item_section}>
                {bannersItem}
            </div>
        )
    }

    const Badges = (is) => {
        const publicBadges = [];
        let currentIndex = 0;
        const itemsPerGroup = [23 + 1, 7, 5, 4, 5, 15, 14, 6, 3, 18, 5, 9, 6, 7, 7, 3, 5, 3, 1, 8, 4, 8];

        for (let i = 0; i < itemsPerGroup.length; i++) {
            const group = [];

            for (let j = 0; j < itemsPerGroup[i]; j++) {
                const itemIndex = currentIndex + j;

                if (badges[itemIndex] === '') continue
                group.push({
                    id: itemIndex,
                    image: badges[itemIndex]
                });
            }

            publicBadges.push(group);
            currentIndex += itemsPerGroup[i];
        }

        const badgesItem = publicBadges[categoryBadges].map((el) => {
            if (el.id === publicBadges[categoryBadges][0].id) {
                return (
                    <div className={s.item} id={el.id} ref={OneElBadge} onClick={() => changeBadge(el.id, is)}>
                        <div className={s.item_section_img}>
                            <img src={el.image}
                                 className={s.item_img}
                                 alt={el.id}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className={s.item} id={el.id} onClick={() => changeBadge(el.id, is)}>
                        <div className={s.item_section_img}>
                            <img src={el.image}
                                 className={s.item_img}
                                 alt={el.id}/>
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className={s.item_sectionBadges}>
                {badgesItem}
            </div>
        )
    }
    const removeBadge = () => {
        valueBadges[pickPlaceBadge] = 0
        setValueBadges(valueBadges)
        rerender()
    }

    const changeBadge = (value, is) => {
        if (is === 'badges') {
            valueBadges[pickPlaceBadge] = value
            setValueBadges(valueBadges)
        } else if (is === 'bigBadges') {
            valueBigBadges[pickPlaceBigBadge] = value
            setValueBigBadges(valueBigBadges)
        }
        rerender()
    }
    const setBackground = async (value) => {
        setImageBackground(backgrounds[value])
        setValueBackground(value)
        rerender()
    }
    const logout = () => {
        localStorage.setItem('Avatar', null)
        localStorage.setItem('Username', null)
        localStorage.setItem('UserId', null)
        localStorage.setItem('DateJoin', null)
        if (process.env.NODE_ENV === 'production') {
            router.push("https://passportoe.ru")
        } else {
            router.push("http://localhost")
        }
    }

    const [time, setTime] = useState(0)
    const [heightElBackground, setHeightElBackground] = useState(0)
    const sideBackground = useRef()
    const OneElBackground = useRef()
    const [heightElBadge, setHeightElBadge] = useState(0)
    const sideBadge = useRef()
    const OneElBadge = useRef()
    const [heightElBanner, setHeightElBanner] = useState(0)
    const sideBanner = useRef()
    const OneElBanner = useRef()
    const [isVertically, setIsVertically] = useState(false)
    const Background = useRef()

    setTimeout(() => {
        if (OneElBackground.current) {
            const pxBackground = sideBackground.current.offsetTop - (OneElBackground.current.clientHeight * 0.7)
            if (heightElBackground !== sideBackground.current.offsetTop - (OneElBackground.current.clientHeight * 0.7)) {
                setHeightElBackground(pxBackground)
            }

        } else if (OneElBadge.current) {
            const pxBadge = (sideBadge.current.offsetTop - OneElBadge.current.offsetTop) - (OneElBadge.current.clientHeight * 0.9)
            if (heightElBadge !== (sideBadge.current.offsetTop - OneElBadge.current.offsetTop) - (OneElBadge.current.clientHeight * 0.9)) {
                setHeightElBadge(pxBadge)
            }

        } else if (OneElBanner.current) {
            const pxBanner = (sideBanner.current.offsetTop - OneElBanner.current.offsetTop) - (OneElBanner.current.clientHeight * 0.6)
            if (heightElBanner !== pxBanner) {
                setHeightElBanner(pxBanner)
            }

        }
        if (typeof window !== "undefined" && window.innerWidth - window.innerHeight < 0) {
            setIsVertically(true)
        } else {
            setIsVertically(false)
        }

        setTime(time + 1)
        const LocalStore = typeof window !== "undefined" ? localStorage : null

        // Запись друзей в локальный стор
        if (LocalStore !== null && LocalStore.getItem('FriendList') !== JSON.stringify(friendList)) {
            LocalStore.setItem('FriendList', JSON.stringify(friendList))
            rerender()
        }

    }, 10)

    const errorLoadImg = async () => {
        console.log('Ошибка загрузки аватара')
        const res = await getReq("GET_USER", 1, userId)
        const user = res.data.users

        const avatar1 = UserAvatar(user[0].userId, user[0].avatar)
        let req = await fetch(avatar1)
        if (req.status !== 404) {
            setAvatar(avatar1)
        } else {
            setAvatar(UserAvatar(userId, null))
        }
    }

    return (<>
            {isVertically === true ?
                <div className={s.rotating_screen}>
                    <img src={'/rotate_2.gif'} alt=""/>
                    <div>Переверните телефон в горизонтальное положение</div>
                </div>
                : <></>}
            <div className={s.background} ref={Background}>
                <header className={s.header}>
                    <div className={s.avatar_section} onClick={() => logout()}>
                        <img onError={ev => errorLoadImg(ev)}
                             src={avatar}
                             alt="Аватар"
                             className={s.avatar}/>
                        <div className={s.username_section}>
                            <div className={s.username}>{username}</div>
                            <div className={s.invisible_text}>Выйти из аккаунта</div>
                        </div>
                    </div>

                    <div className={s.logo}>OBSIDIAN EMPIRE</div>
                </header>
                <div className={s.main}>

                    <canvas className={s.canvas} ref={canvasRef}/>

                    <div className={s.TwoGrid}>
                        <div className={s.navbar}>
                            <div className={s.top}>
                                <div className={s.name_logo}>Задачи</div>
                                <div className={s.item}>
                                    {editPassport[0] === true ?
                                        <img
                                            src={'/checkboxOn.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                        :
                                        <img
                                            src={'/checkboxOff.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                    }
                                    <div className={s.item_text} onClick={() => setValue(6)}>
                                        <a href="#content" className={s.text}>
                                            5 Разных значков
                                        </a>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    {editPassport[1] === true ?
                                        <img
                                            src={'/checkboxOn.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                        :
                                        <img
                                            src={'/checkboxOff.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                    }
                                    <div className={s.item_text} onClick={() => setValue(2)}>
                                        <a href="#content" className={s.text}>
                                            О себе(3 строки)
                                        </a>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    {editPassport[2] === true ?
                                        <img
                                            src={'/checkboxOn.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                        :
                                        <img
                                            src={'/checkboxOff.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                    }
                                    <div className={s.item_text} onClick={() => setValue(4)}>
                                        <a href="#content" className={s.text}>
                                            2 Баннера
                                        </a>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    {editPassport[3] === true ?
                                        <img
                                            src={'/checkboxOn.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                        :
                                        <img
                                            src={'/checkboxOff.png'}
                                            alt={"Картинка"}
                                            className={s.checkbox}/>
                                    }
                                    <div className={s.item_text} onClick={() => setValue(5)}>
                                        <a href="#content" className={s.text}>
                                            2 Больших значка
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    editPassport[0] === true &&
                                    editPassport[1] === true &&
                                    editPassport[2] === true &&
                                    editPassport[3] === true ?
                                        s.download : s.disable_download
                                }
                                onClick={
                                    editPassport[0] === true &&
                                    editPassport[1] === true &&
                                    editPassport[2] === true &&
                                    editPassport[3] === true ?
                                        () => downloadCanvas() : console.log
                                }
                            >
                                <a className={s.text}>
                                    Скачать
                                </a>
                                <a ref={downloadLink}/>
                            </div>
                        </div>
                    </div>

                </div>
                <div>{process.env.NODE_ENV === 'development' ? value : <></>}</div>
                <a id="content">
                    {value === 0 ?
                        <div>
                            <div className={s.section_name}>Выберите следующую область для редактирования</div>
                            <div className={s.pick_value}>
                                <div className={s.edit_section}>
                                    <div className={s.item} onClick={() => setValue(1)}>Редактировать Фон</div>
                                    <div className={s.item} onClick={() => setValue(2)}>Редактировать О себе</div>
                                    <div className={s.item} onClick={() => setValue(3)}>Редактировать список друзей
                                    </div>
                                    <div className={s.item} onClick={() => setValue(4)}>Редактировать Баннеры</div>
                                    <div className={s.item} onClick={() => setValue(5)}>Редактировать Любимые значки
                                    </div>
                                    <div className={s.item} onClick={() => setValue(6)}>Редактировать Значки</div>
                                </div>
                                <div className={s.div_img}>
                                    <div className={s.block_passport}>
                                        <div className={s.big_text}>
                                            PassportOE
                                        </div>

                                        <div className={s.standard_text}>
                                            Сайт для облегчения процесса создания паспортов
                                        </div>
                                        {/*<div>
                                            <Link href={"/faq"}>
                                                <a className={s.faq}>Нужна помощь?</a>
                                            </Link>
                                        </div>*/}

                                        <div className={s.small_text}>
                                            by Krimax, SkvaiRans & Miffrill
                                        </div>
                                    </div>
                                    <img
                                        src={'/backPassport.png'}
                                        className={s.img}
                                        alt="Паспорта"/>
                                </div>
                            </div>
                        </div>
                        : <></>}

                    {value === 1 ?
                        <div>
                            <div className={s.section_name}>Выберите фон паспорта</div>
                            <div className={s.input_section}>
                                <div className={s.navbar_section}>{Categories('background')}</div>
                                <div className={s.pick_section}>
                                    <div className={s.pick_items}>{pickBackground(categoryBackground)}</div>
                                    <div className={heightElBackground > 0 ? s.sideNav : s.sideNavBack}
                                         onClick={() => setValue(0)} ref={sideBackground}>
                                        Выбрать ”{namesBackgrounds[valueBackground]}”
                                    </div>
                                </div>

                            </div>
                        </div>
                        : <></>}
                    {value === 2 ?
                        <div>
                            <div className={s.section_name}>Личная информация</div>
                            <div className={s.info_section}>


                                <div className={s.text}>
                                    Дата прибытия: <br/>
                                    ( Допустим вы зашли 9 января 2020 года, запишем так: 2020-01-09 )
                                    <div>
                                        <input className={s.textarea}
                                               onChange={event => setDateJoin(event.target.value)}
                                               value={dateJoin}
                                               type="text"
                                        />
                                    </div>

                                </div>
                                <div className={s.text}>О себе:
                                    <div className={s.textarea_section}>
                                        <textarea className={s.textarea}
                                                  onChange={event => setAbout(event.target.value)}
                                                  value={about}
                                        />
                                    </div>
                                </div>

                                <div className={s.close_section}>
                                    <div className={s.close}
                                         onClick={() => setValue(0)}>
                                        Закончить редактирование
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {value === 3 ?
                        <div>
                            <div className={s.section_name}>Друзья</div>
                            <div className={s.friends_section}>
                                <div className={s.addFriend_section}>
                                    <div className={s.addFriend}>
                                        <div className={s.search_section}>
                                            <input className={s.textarea}
                                                   placeholder={'Имя или id'}
                                                   onChange={event => {
                                                       setSearch(event.target.value)
                                                   }}
                                                   value={search}/>
                                            <img src={"/reload.svg"}
                                                 alt="reload"
                                                 className={s.svg}
                                                 onClick={() => {
                                                     setPeopleList([])
                                                     setLoadingPeopleList(true)
                                                     setErrorLoadingPeopleList(false)

                                                     setTimeout(() => {
                                                         setReqSearch(true)
                                                         setLoadingPeopleList(false)
                                                     }, 500);
                                                 }}/>
                                        </div>
                                        <div className={s.user_section}>
                                            {loadingPeopleList === true
                                                ?
                                                <div className={s.loadingPeopleList}>
                                                    <div>
                                                        Загрузка пользователей...
                                                    </div>
                                                    <img src={"/reload.svg"} alt="reload" className={s.svg}/>
                                                </div>
                                                :
                                                <></>}
                                            {errorLoadingPeopleList === true
                                                ?
                                                <div className={s.noFoundUser}>
                                                    <div className={s.XRedMark}>
                                                        <img
                                                            src={'/XRedMark.png'}
                                                            alt={"X Red Mark"}
                                                        />
                                                    </div>
                                                    <div className={s.textErrorFoundUser}>
                                                        Пользователь не найден
                                                    </div>
                                                </div>
                                                :
                                                <></>}

                                            {noFriendsList()}
                                        </div>
                                    </div>
                                </div>

                                <div className={s.listFriend_section}>
                                    <div className={s.title}>
                                        <div className={s.big_name}>
                                            Список друзей
                                        </div>
                                        <div className={s.selection_users}>
                                            {isSelectAll === true ?
                                                <img
                                                    src={'/checkboxOn.png'}
                                                    alt={"Картинка"}
                                                    className={s.checkbox}/>
                                                :
                                                <img
                                                    src={'/checkboxOff.png'}
                                                    alt={"Картинка"}
                                                    className={s.checkbox}/>}
                                            <div className={s.text_selection_users} onClick={() => AllSelectFriends()}>
                                                Выбрать всех
                                            </div>
                                        </div>
                                        <div className={s.btn_delete} onClick={() => DeletingSelectedUsers()}>
                                            Удалить
                                        </div>
                                    </div>
                                    <div className={s.listFriend}>
                                        <div className={s.item_section}>
                                            {friendListDisplay()}
                                        </div>

                                        <div className={s.sideNav} onClick={() => setValue(0)}>
                                            Закончить редактирование
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {value === 4 ?
                        <div>
                            <div className={s.section_name}>Выберите баннеры</div>
                            <div className={s.section_bnrs}>
                                <div className={s.section_pickBnrs}>
                                    {BannerCategories()}
                                    <div>
                                        {Banners()}
                                        <div className={heightElBanner > 0 ? s.sideNav : s.sideNavBack}
                                             onClick={() => setValue(0)} ref={sideBanner}>
                                            Закончить редактирование
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {pickPlace('banners')}
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {value === 5 ?
                        <div>
                            <div className={s.section_name}>Выберите Любимые Значки</div>
                            <div className={s.section_bigBadges}>
                                <div className={s.section_pickBigBadges}>
                                    {Categories('bigBadges')}
                                    <div>
                                        {Badges('bigBadges')}
                                        <div className={heightElBadge > 0 ? s.sideNav : s.sideNavBack}
                                             onClick={() => setValue(0)} ref={sideBadge}>
                                            Закончить редактирование
                                        </div>
                                    </div>
                                </div>
                                <div className={s.section_placeBigBadges}>
                                    {pickPlace('bigBadges')}
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {value === 6 ?
                        <div>
                            <div className={s.section_name}>Выберите Значки</div>
                            <div className={s.section_badges}>
                                <div className={s.pickBadges_section}>
                                    {Categories('badges')}
                                    <div>
                                        {Badges('badges')}
                                        <div className={heightElBadge > 0 ? s.sideNav : s.sideNavBack}
                                             onClick={() => setValue(0)} ref={sideBadge}>
                                            Закончить редактирование
                                        </div>
                                    </div>
                                </div>
                                <div className={s.pick_section}>
                                    {valueBadges[pickPlaceBadge] === 0 ?
                                        <div className={s.btn_deleteOff}>
                                            Убрать
                                        </div>
                                        :
                                        <div onClick={() => removeBadge()}
                                             className={s.btn_delete}>
                                            Убрать
                                        </div>}
                                    {pickPlace('badges')}
                                </div>
                            </div>
                        </div>
                        : <></>}
                </a>
            </div>
        </>
    )

}

export default Canvas;
