import FriendsRerender from "./FriendsRerender";

const renderCanvas = async (canvas, areas, editPassport, setEditPassport) => {
    const ctx = canvas.getContext("2d")
    ctx.canvas.width = 1920;
    ctx.canvas.height = 1080;

    const renderImg = (file, cord) => {
        const img = new Image
        img.setAttribute('crossorigin', 'anonymous')
        img.src = file
        img.onload = () => {
            ctx.drawImage(img, cord[0], cord[1], cord[2], cord[3])
        }
    }

    //Задний фон
    if (areas.background != null) {
        const img = new Image
        img.setAttribute('crossorigin', 'anonymous')
        img.src = areas.background
        img.onload = () => {

            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
            //Аватар
            if (areas.avatar != null) {
                renderImg(areas.avatar, avatarCord)
            }
            //О себе
            if (areas.text != null) {
                if (areas.text[0] != null) {
                    ctx.font = "31px abel";
                    if (areas.whiteText) {
                        ctx.fillStyle="white";
                    }
                    ctx.fillText(areas.text[0], 207, 530);
                }
                if (areas.text[1] != null) {
                    ctx.font = "31px abel";
                    if (areas.whiteText) {
                        ctx.fillStyle="white";
                    }
                    ctx.fillText(areas.text[1], 207, 573)
                }
                if (areas.text[2] != null) {
                    ctx.font = "30px abel"
                    if (areas.whiteText) {
                        ctx.fillStyle="white"
                    }
                    let text
                    let mass = areas.text[2].split(' ')
                    let cordY = 620
                    const lengthText = (value) => {
                        return ctx.measureText(value).width
                    }
                    const loop = (value, Mass) => {
                        let lastObject
                        for (let fakeMass1 = Mass;;) {
                            lastObject = fakeMass1.length
                            if (lengthText(fakeMass1) < value) {
                                return lastObject
                            }
                            lastObject = fakeMass1.length - 1
                            fakeMass1.splice(lastObject, 1)
                        }
                    }
                    let number = loop(590, mass)
                    let number1 = 0

                    text = mass.slice(0, number)
                    ctx.fillText(mass.join(' '), 207, cordY)

                    mass = areas.text[2].split(' ')
                    //Вторая строка
                    if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                        number1 = number
                        mass = mass.slice(number1, 10000)
                        number = loop(760, mass)
                        text = mass.slice(0, number)

                        cordY = cordY + 48
                        ctx.fillText(text.join(' '), 45, cordY)

                        mass = areas.text[2].split(' ')
                        mass.slice(number1, 10000)
                        //Третья строка
                        if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                            mass = areas.text[2].split(' ')

                            number1 = number1 + number
                            mass = mass.slice(number1, 10000)
                            number = loop(760, mass)
                            mass.slice(0, number)
                            if (mass.length > 0) {
                                editPassport[1] = true
                                setEditPassport(editPassport)
                            }
                            else {
                                editPassport[1] = false
                                setEditPassport(editPassport)
                            }
                            cordY = cordY + 47
                            ctx.fillText(mass.join(' '), 45, cordY)

                            mass = areas.text[2].split(' ')
                            mass.slice(number1, 10000)
                            //Четвертая строка
                            if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                mass = areas.text[2].split(' ')

                                number1 = number1 + number
                                mass = mass.slice(number1, 10000)
                                number = loop(760, mass)
                                mass.slice(0, number)
                                cordY = cordY + 48
                                ctx.fillText(mass.join(' '), 45, cordY)

                                mass = areas.text[2].split(' ')
                                //Пятая строка
                                if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                    mass = areas.text[2].split(' ')

                                    number1 = number1 + number
                                    mass = mass.slice(number1, 10000)
                                    number = loop(760, mass)
                                    mass.slice(0, number)

                                    cordY = cordY + 48
                                    ctx.fillText(mass.join(' '), 45, cordY)

                                    mass = areas.text[2].split(' ')
                                    mass.slice(number1, 10000)
                                    //Шестая строка
                                    if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                        mass = areas.text[2].split(' ')

                                        number1 = number1 + number
                                        mass = mass.slice(number1, 10000)
                                        number = loop(760, mass)
                                        mass.slice(0, number)

                                        cordY = cordY + 48
                                        ctx.fillText(mass.join(' '), 45, cordY)

                                        mass = areas.text[2].split(' ')
                                        mass.slice(number1, 10000)
                                        //Седьмая строка
                                        if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                            mass = areas.text[2].split(' ')

                                            number1 = number1 + number
                                            mass = mass.slice(number1, 10000)
                                            number = loop(760, mass)
                                            mass.slice(0, number)

                                            cordY = cordY + 48
                                            ctx.fillText(mass.join(' '), 45, cordY)
                                            mass = areas.text[2].split(' ')
                                            mass.slice(number1, 10000)
                                            //Восьмая строка
                                            if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                                mass = areas.text[2].split(' ')

                                                number1 = number1 + number
                                                mass = mass.slice(number1, 10000)
                                                number = loop(760, mass)
                                                mass.slice(0, number)

                                                cordY = cordY + 48
                                                ctx.fillText(mass.join(' '), 45, cordY)

                                                mass = areas.text[2].split(' ')
                                                mass.slice(number1, 10000)
                                                //Девятая строка
                                                if (lengthText(mass.join(' ')) > lengthText(text.join(' '))) {

                                                    mass = areas.text[2].split(' ')

                                                    number1 = number1 + number
                                                    mass = mass.slice(number1, 10000)
                                                    number = loop(760, mass)
                                                    mass.slice(0, number)

                                                    cordY = cordY + 48
                                                    ctx.fillText(mass.join(' '), 45, cordY)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        editPassport[1] = false
                        setEditPassport(editPassport)
                    }
                }

            }
            //Друзья
            if (areas.friends.length > 0) {
                /*const weight = friendsCord[2]
                const height = friendsCord[3]
                const NumberOfUsers = 370*/
                // Если друзей меньше 370
                if (areas.friends.length < 371) {
                    const friendCords = FriendsRerender(areas.friends.length, friendsCord)

                    if (areas.friends.length < 4) {
                        for (let i = 0; i < 3; i++) {
                            renderImg(areas.friends[i], friendsCord1[i])
                        }
                    } else {
                        for (let i = 0; i < areas.friends.length; i++) {
                            renderImg(areas.friends[i], friendCords[i])
                        }
                    }
                }
                // Если друзей БОЛЬШЕ 370
                else {
                    ctx.font = "60px abel";
                    ctx.fillText('Слишком много друзей :)', 1277, 140)
                }

                /*else if (areas.friends.length < 15) {
                    for (let i = 0; i < 14; i++) {
                        renderImg(areas.friends[i], friendsCord2[i])
                    }

                } else if (areas.friends.length < 34) {
                    for (let i = 0; i < 33; i++) {
                        renderImg(areas.friends[i], friendsCord3[i])
                    }

                } else if (areas.friends.length < 61) {
                    for (let i = 0; i < 60; i++) {
                        renderImg(areas.friends[i], friendsCord4[i])
                    }

                } else {
                    console.log("Ты шо дебил?")
                }*/
            }
            else {
                ctx.font = "80px abel";
                ctx.fillText('Нету', 1480, 150)
            }
            //Баннеры
            /*for (let i = 0; i < 2; i++) {
                if (areas.banner[i] != null) {
                    renderImg(areas.banner[i], bannersCord[i])
                }
            }*/
            if (areas.banner[0] != null) {
                if (areas.flipBanner[0] === true) {
                    const img = new Image
                    img.src = areas.banner[0]
                    img.onload = () => {

                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1)
                        ctx.drawImage(img, bannersCord[0][0], bannersCord[0][1], bannersCord[0][2], bannersCord[0][3])

                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1)
                    }
                } else {
                    renderImg(areas.banner[0], bannersCord[1])
                }
            }
            if (areas.banner[1] != null) {
                if (areas.flipBanner[1] === true) {
                    const img = new Image
                    img.src = areas.banner[1]
                    img.onload = () => {

                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1)
                        ctx.drawImage(img, bannersCord[2][0], bannersCord[2][1], bannersCord[2][2], bannersCord[2][3])

                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1)
                    }
                } else {
                    renderImg(areas.banner[1], bannersCord[3])
                }

            }
            //Большой значок
            if (areas.bigBadges != null) {
                for (let i = 0; i < 2; i++)
                renderImg(areas.bigBadges[i], bgBadgesCord[i])
            }
            //Значки
            for (let i = 0; i < 20; i++) {
                if (areas.badge[i] != null) {
                    renderImg(areas.badge[i], badgesCord[i])
                }
            }
        }

    }
}

const avatarCord = [405, 32, 417, 417]
const badgesCord = [
    [1220, 237, 145, 145], //1 столб 1 слот
    [1395, 237, 145, 145], //1 столб 2 слот
    [1570, 237, 145, 145], //1 столб 3 слот
    [1745, 237, 145, 145], //1 столб 4 слот

    [1220, 405, 145, 145], //2 столб 1 слот
    [1395, 405, 145, 145], //2 столб 2 слот
    [1570, 405, 145, 145], //2 столб 3 слот
    [1745, 405, 145, 145], //2 столб 4 слот

    [1220, 573, 145, 145], //3 столб 1 слот
    [1395, 573, 145, 145], //3 столб 2 слот
    [1570, 573, 145, 145], //3 столб 3 слот
    [1745, 573, 145, 145], //3 столб 4 слот

    [1220, 741, 145, 145], //4 столб 1 слот
    [1395, 741, 145, 145], //4 столб 2 слот
    [1570, 741, 145, 145], //4 столб 3 слот
    [1745, 741, 145, 145], //4 столб 4 слот

    [1220, 909, 145, 145], //5 столб 1 слот
    [1395, 909, 145, 145], //5 столб 2 слот
    [1570, 909, 145, 145], //5 столб 3 слот
    [1745, 909, 145, 145], //5 столб 4 слот
]

const bgBadgesCord = [
    [870, 405, 313, 313],
    [870, 741, 313, 313]
]
const bannersCord = [
    [898, 0, 171, 370],
    [851, 0, 171, 370],
    [889, 0, -171, 370],
    [1031, 0, 171, 370],
]
const friendsCord = [1220, 28, 670, 180]
const friendsCord1 = [ //3 друга
    [1252, 28, 180, 180],
    [1463, 28, 180, 180],
    [1676, 28, 180, 180]
]
const friendsCord2 = [ //14 друзей
    [1239, 28, 90, 90],
    [1329, 28, 90, 90],
    [1419, 28, 90, 90],
    [1509, 28, 90, 90],
    [1599, 28, 90, 90],
    [1689, 28, 90, 90],
    [1779, 28, 90, 90],

    [1239, 118, 90, 90],
    [1329, 118, 90, 90],
    [1419, 118, 90, 90],
    [1509, 118, 90, 90],
    [1599, 118, 90, 90],
    [1689, 118, 90, 90],
    [1779, 118, 90, 90],
]
const friendsCord3 = [ //33 друга
    [1224, 28, 60, 60],
    [1284, 28, 60, 60],
    [1344, 28, 60, 60],
    [1404, 28, 60, 60],
    [1464, 28, 60, 60],
    [1524, 28, 60, 60],
    [1584, 28, 60, 60],
    [1644, 28, 60, 60],
    [1704, 28, 60, 60],
    [1764, 28, 60, 60],
    [1824, 28, 60, 60],

    [1224, 88, 60, 60],
    [1284, 88, 60, 60],
    [1344, 88, 60, 60],
    [1404, 88, 60, 60],
    [1464, 88, 60, 60],
    [1524, 88, 60, 60],
    [1584, 88, 60, 60],
    [1644, 88, 60, 60],
    [1704, 88, 60, 60],
    [1764, 88, 60, 60],
    [1824, 88, 60, 60],

    [1224, 148, 60, 60],
    [1284, 148, 60, 60],
    [1344, 148, 60, 60],
    [1404, 148, 60, 60],
    [1464, 148, 60, 60],
    [1524, 148, 60, 60],
    [1584, 148, 60, 60],
    [1644, 148, 60, 60],
    [1704, 148, 60, 60],
    [1764, 148, 60, 60],
    [1824, 148, 60, 60],
]
const friendsCord4 = [ // 60 друзей
    [1218, 28, 45, 45],
    [1263, 28, 45, 45],
    [1308, 28, 45, 45],
    [1353, 28, 45, 45],
    [1398, 28, 45, 45],
    [1443, 28, 45, 45],
    [1487, 28, 45, 45],
    [1532, 28, 45, 45],
    [1578, 28, 45, 45],
    [1623, 28, 45, 45],
    [1668, 28, 45, 45],
    [1713, 28, 45, 45],
    [1758, 28, 45, 45],
    [1803, 28, 45, 45],
    [1848, 28, 45, 45],

    [1218, 73, 45, 45],
    [1263, 73, 45, 45],
    [1308, 73, 45, 45],
    [1353, 73, 45, 45],
    [1398, 73, 45, 45],
    [1443, 73, 45, 45],
    [1487, 73, 45, 45],
    [1532, 73, 45, 45],
    [1578, 73, 45, 45],
    [1623, 73, 45, 45],
    [1668, 73, 45, 45],
    [1713, 73, 45, 45],
    [1758, 73, 45, 45],
    [1803, 73, 45, 45],
    [1848, 73, 45, 45],

    [1218, 118, 45, 45],
    [1263, 118, 45, 45],
    [1308, 118, 45, 45],
    [1353, 118, 45, 45],
    [1398, 118, 45, 45],
    [1443, 118, 45, 45],
    [1487, 118, 45, 45],
    [1532, 118, 45, 45],
    [1578, 118, 45, 45],
    [1623, 118, 45, 45],
    [1668, 118, 45, 45],
    [1713, 118, 45, 45],
    [1758, 118, 45, 45],
    [1803, 118, 45, 45],
    [1848, 118, 45, 45],

    [1218, 163, 45, 45],
    [1263, 163, 45, 45],
    [1308, 163, 45, 45],
    [1353, 163, 45, 45],
    [1398, 163, 45, 45],
    [1443, 163, 45, 45],
    [1487, 163, 45, 45],
    [1532, 163, 45, 45],
    [1578, 163, 45, 45],
    [1623, 163, 45, 45],
    [1668, 163, 45, 45],
    [1713, 163, 45, 45],
    [1758, 163, 45, 45],
    [1803, 163, 45, 45],
    [1848, 163, 45, 45]
]
const textArea = [28, 482, 796, 577]

export default renderCanvas
