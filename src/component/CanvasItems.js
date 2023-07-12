const mass = {}

mass.badges = [
    // ДЛя всех
    '', // Это обязательно, для чего не помню, но нужно
    '/badges/everyone/1.png',
    '/badges/everyone/2.png',
    '/badges/everyone/3.png',
    '/badges/everyone/4.png',
    '/badges/everyone/5.png',
    '/badges/everyone/6.png',
    '/badges/everyone/7.png',
    '/badges/everyone/8.png',
    '/badges/everyone/9.png',
    '/badges/everyone/10.png',
    '/badges/everyone/11.png',
    '/badges/everyone/12.png',
    '/badges/everyone/13.png',
    '/badges/everyone/14.png',
    '/badges/everyone/15.png',
    '/badges/everyone/16.png',
    '/badges/everyone/17.png',
    '/badges/everyone/18.png',
    '/badges/everyone/19.png',
    '/badges/everyone/20.png',
    '/badges/everyone/21.png',
    '/badges/everyone/22.png',
    '/badges/everyone/23.png',
    //Турниры
    '/badges/tournaments/1.png',
    '/badges/tournaments/2.png',
    '/badges/tournaments/3.png',
    '/badges/tournaments/4.png',
    '/badges/tournaments/5.png',
    '/badges/tournaments/6.png',
    '/badges/tournaments/7.png',
    //Ивенты
    '/badges/events/1.png',
    '/badges/events/2.png',
    '/badges/events/3.png',
    '/badges/events/4.png',
    '/badges/events/5.png',
    //Магазин
    '/badges/store/1.png',
    '/badges/store/2.png',
    '/badges/store/3.png',
    '/badges/store/4.png',
    //Творцы
    '/badges/creators/1.png',
    '/badges/creators/2.png',
    '/badges/creators/3.png',
    '/badges/creators/4.png',
    '/badges/creators/5.png',
    //Хэлуин
    '/badges/halloween/1.png',
    '/badges/halloween/2.png',
    '/badges/halloween/3.png',
    '/badges/halloween/4.png',
    '/badges/halloween/5.png',
    '/badges/halloween/6.png',
    '/badges/halloween/7.png',
    '/badges/halloween/8.png',
    '/badges/halloween/9.png',
    '/badges/halloween/10.png',
    '/badges/halloween/11.png',
    '/badges/halloween/12.png',
    '/badges/halloween/13.png',
    '/badges/halloween/14.png',
    '/badges/halloween/15.png',
    '/badges/halloween/16.png',
    '/badges/halloween/17.png',
    '/badges/halloween/18.png',
    '/badges/halloween/19.png',
    //Новый год
    '/badges/newYear/1.png',
    '/badges/newYear/2.png',
    '/badges/newYear/3.png',
    '/badges/newYear/4.png',
    '/badges/newYear/5.png',
    '/badges/newYear/6.png',
    '/badges/newYear/7.png',
    '/badges/newYear/8.png',
    '/badges/newYear/9.png',
    '/badges/newYear/10.png',
    '/badges/newYear/11.png',
    '/badges/newYear/12.png',
    '/badges/newYear/13.png',
    '/badges/newYear/14.png',
    '/badges/newYear/15.png',
    '/badges/newYear/16.png',
    '/badges/newYear/17.png',
    '/badges/newYear/18.png',
    //Сезоны
    '/badges/seasons/1.png',
    '/badges/seasons/2.png',
    '/badges/seasons/3.png',
    '/badges/seasons/4.png',
    '/badges/seasons/5.png',
    '/badges/seasons/6.png',
    //Лапки
    '/badges/paws/1.png',
    '/badges/paws/2.png',
    '/badges/paws/3.png',
    //Кооп
    '/badges/coop/1.png',
    '/badges/coop/2.png',
    '/badges/coop/3.png',
    '/badges/coop/4.png',
    '/badges/coop/5.png',
    '/badges/coop/6.png',
    '/badges/coop/7.png',
    '/badges/coop/8.png',
    '/badges/coop/9.png',
    '/badges/coop/10.png',
    '/badges/coop/11.png',
    '/badges/coop/12.png',
    '/badges/coop/13.png',
    '/badges/coop/14.png',
    '/badges/coop/15.png',
    '/badges/coop/16.png',
    '/badges/coop/17.png',
    '/badges/coop/18.png',
    //Старый магазин
    '/badges/storeOld/1.png',
    '/badges/storeOld/2.png',
    '/badges/storeOld/3.png',
    '/badges/storeOld/4.png',
    '/badges/storeOld/5.png',
    //Лимитированные
    '/badges/limited/1.png',
    '/badges/limited/2.png',
    '/badges/limited/3.png',
    '/badges/limited/4.png',
    '/badges/limited/5.png',
    '/badges/limited/6.png',
    '/badges/limited/7.png',
    '/badges/limited/8.png',
    '/badges/limited/9.png',
    //Баллы
    '/badges/points/1.png',
    '/badges/points/2.png',
    '/badges/points/3.png',
    '/badges/points/4.png',
    '/badges/points/5.png',
    '/badges/points/6.png',
    //'Я был'
    '/badges/iWas/1.png',
    '/badges/iWas/2.png',
    '/badges/iWas/3.png',
    '/badges/iWas/4.png',
    '/badges/iWas/5.png',
    '/badges/iWas/6.png',
    '/badges/iWas/7.png',
    //Стримы
    '/badges/streams/1.png',
    '/badges/streams/2.png',
    '/badges/streams/3.png',
    '/badges/streams/4.png',
    '/badges/streams/5.png',
    '/badges/streams/6.png',
    '/badges/streams/7.png',
    //Старые побочные
    '/badges/sideOld/1.png',
    '/badges/sideOld/2.png',
    '/badges/sideOld/3.png',
    //Сообщения
    '/badges/messages/1.png',
    '/badges/messages/2.png',
    '/badges/messages/3.png',
    '/badges/messages/4.png',
    '/badges/messages/5.png',
    //Поддержка
    '/badges/helpOE/1.png',
    '/badges/helpOE/2.png',
    '/badges/helpOE/3.png',
    //Достижения
    '/badges/achievements/1.png',
    //Праздники
    '/badges/holidays/1.png',
    '/badges/holidays/2.png',
    '/badges/holidays/3.png',
    '/badges/holidays/4.png',
    '/badges/holidays/5.png',
    '/badges/holidays/6.png',
    '/badges/holidays/7.png',
    '/badges/holidays/8.png',
    //Аниме раздел
    '/badges/anime/1.png',
    '/badges/anime/2.png',
    '/badges/anime/3.png',
    '/badges/anime/4.png',
    //Рейтинг
    '/badges/rating/1.png',
    '/badges/rating/2.png',
    '/badges/rating/3.png',
    '/badges/rating/4.png',
    '/badges/rating/5.png',
    '/badges/rating/6.png',
    '/badges/rating/7.png',
    '/badges/rating/8.png',

]
mass.backgrounds = [
    //Доступные всем
    '/backgrounds/everyone/1.jpg',
    '/backgrounds/everyone/2.jpg',
    '/backgrounds/everyone/3.jpg',
    '/backgrounds/everyone/4.jpg',
    //Творчество
    '/backgrounds/creators/1.jpg',
    '/backgrounds/creators/2.jpg',
    '/backgrounds/creators/3.jpg',
    '/backgrounds/creators/4.jpg',
    '/backgrounds/creators/5.jpg',
    '/backgrounds/creators/6.jpg',
    '/backgrounds/creators/7.jpg',
    '/backgrounds/creators/8.jpg',
    '/backgrounds/creators/9.jpg',
    '/backgrounds/creators/11.jpg',
    //Магазин
    '/backgrounds/store/1.jpg',
    '/backgrounds/store/2.jpg',
    //Праздники
    '/backgrounds/holidays/1.jpg',
    '/backgrounds/holidays/2.jpg',
    '/backgrounds/holidays/3.jpg',
    '/backgrounds/holidays/4.jpg',
    '/backgrounds/holidays/5.jpg',
    '/backgrounds/holidays/6.jpg',
    '/backgrounds/holidays/7.jpg',
    '/backgrounds/holidays/8.jpg',
    '/backgrounds/holidays/9.jpg',
    '/backgrounds/holidays/10.jpg',
    '/backgrounds/holidays/11.jpg',
    //Баллы
    '/backgrounds/points/6.jpg', //30 Баллов
    '/backgrounds/points/1.jpg', //50 Баллов
    '/backgrounds/points/2.jpg',
    '/backgrounds/points/3.jpg',
    '/backgrounds/points/4.jpg',
    '/backgrounds/points/5.jpg',
    //Сезоны
    '/backgrounds/seasons/1.jpg',
    '/backgrounds/seasons/2.jpg',
    '/backgrounds/seasons/3.jpg',
    '/backgrounds/seasons/4.jpg',
    '/backgrounds/seasons/5.jpg',
    '/backgrounds/seasons/6.jpg',
    //Старый магазин
    '/backgrounds/oldStore/1.jpg',
    '/backgrounds/oldStore/2.jpg',
    '/backgrounds/oldStore/3.jpg',
    '/backgrounds/oldStore/4.jpg',
    //Помощь империи
    '/backgrounds/helpOE/1.jpg',
    '/backgrounds/helpOE/2.jpg',
    //Ивенты
    '/backgrounds/events/1.jpg',
    '/backgrounds/events/2.jpg',
    '/backgrounds/events/3.jpg',

]
mass.namesBackgrounds = [
    // Доступные всем
    'Обычная бумажная',
    'Обычная помятая',
    'Карамелька фон',
    'Фон от Редиски',
    // Творчество
    'Автор Александра',
    'Автор Минотавр',
    'Автор Процент',
    'Автор Дхеппг',
    'Автор LafiaFeed',
    'Автор Кто-то [%]',
    'Автор Nafanya',
    'Автор Nafanya',
    'Автор Дреамка',
    'Творческий конкурс',
    'Лавовый пляж',
    'Вулкан',
    'Пасха 2020',
    'Снеговик 2019',
    'Дед мороз 2019',
    'Злой фамперенок 2019',
    'Жуткие тыквы 2020',
    'Снежный день',
    'Северное сияние',
    'День святого Валентина 2021',
    'День святого Валетина 2021',
    'День святого Валетина 2021',
    'День святого Валетина 2021',
    '30 баллов',
    '50 баллов',
    '75 баллов',
    '100 баллов',
    '150 баллов',
    '200 баллов',
    'Кристальный стражник',
    'Кристальный гарнизон',
    'Кристальный воитель',
    'Кристальный берсерк',
    'Бета тест',
    'Релиз кандитат',
    'Волны',
    'Бирюза',
    'Ассоциация',
    'Лучи',
    'Ускоритель Империи',
    'Twitch Легионер',
    //Ивенты
    'Весельчак',
    'Ценитель ивентов',
    'Ветеран ивентов'
]
mass.banners = [
    '/bnr/everyone/1.png',
    '/bnr/everyone/2.png',
    '/bnr/everyone/3.png',
    '/bnr/everyone/4.png',
    '/bnr/everyone/5.png',
    '/bnr/everyone/6.png',
    '/bnr/everyone/7.png',
    '/bnr/everyone/8.png',
    //Творчество
    '/bnr/creators/1.png',
    '/bnr/creators/2.png',
    '/bnr/creators/3.png',
    '/bnr/creators/4.png',
    //Магазин
    '/bnr/store/1.png',
    '/bnr/store/2.png',
    //Праздники
    '/bnr/holidays/1.png',
    '/bnr/holidays/2.png',
    '/bnr/holidays/3.png',
    '/bnr/holidays/4.png',
    '/bnr/holidays/5.png',
    '/bnr/holidays/6.png',
    '/bnr/holidays/7.png',
    '/bnr/holidays/8.png',
    '/bnr/holidays/9.png',
    '/bnr/holidays/10.png',
    '/bnr/holidays/11.png',
    '/bnr/holidays/12.png',
    '/bnr/holidays/13.png',
    //Сезоны
    '/bnr/seasons/1.png',
    '/bnr/seasons/2.png',
    '/bnr/seasons/3.png',
    '/bnr/seasons/4.png',
    //Старый магазин
    '/bnr/storeOld/1.png',
    '/bnr/storeOld/2.png',
    '/bnr/storeOld/3.png',
    //Элитки
    '/bnr/elites/1.png',
    //Ивенты
    '/bnr/events/1.png',
    '/bnr/events/2.png',
    '/bnr/events/3.png'
]
mass.publicBanners = [
    [
        {
            id: 0,
            name: 'Синий баннер',
            image: mass.banners[0]
        },
        {
            id: 1,
            name: 'Фиолетовый баннер',
            image: mass.banners[1]
        },
        {
            id: 2,
            name: 'Желтый баннер',
            image: mass.banners[2]
        },
        {
            id: 3,
            name: 'Зеленный баннер',
            image: mass.banners[3]
        },
        {
            id: 4,
            name: 'Карамелька',
            image: mass.banners[4]
        },
        {
            id: 5,
            name: 'Автор Прелат',
            image: mass.banners[5]
        },
        {
            id: 6,
            name: 'Автор Редиска',
            image: mass.banners[6]
        },
        {
            id: 7,
            name: 'Автор Уран',
            image: mass.banners[7]
        },
    ],
    [
        {
            id: 8,
            name: 'Автор Минотавр',
            image: mass.banners[8]
        },
        {
            id: 9,
            name: 'Автор Процент',
            image: mass.banners[9]
        },
        {
            id: 10,
            name: 'Автор Александра',
            image: mass.banners[10]
        },
        {
            id: 11,
            name: 'Творческий конкурс',
            image: mass.banners[11]
        },
    ],
    [
        {
            id: 12,
            name: 'Спокойсвие Горы',
            image: mass.banners[12]
        },
        {
            id: 13,
            name: 'Активный Вулкан',
            image: mass.banners[13]
        },
    ],
    [
        {
            id: 14,
            name: 'Пасха 2020',
            image: mass.banners[14]
        },
        {
            id: 15,
            name: 'Снежинка 2019',
            image: mass.banners[15]
        },
        {
            id: 16,
            name: 'Елочка 2019',
            image: mass.banners[16]
        },
        {
            id: 17,
            name: 'Черная кошечка 2019',
            image: mass.banners[17]
        },
        {
            id: 18,
            name: 'Злобная тыковка',
            image: mass.banners[18]
        },
        {
            id: 19,
            name: 'Собрание тыкв 2020',
            image: mass.banners[19]
        },
        {
            id: 20,
            name: 'Неоновое зло 2020',
            image: mass.banners[20]
        },
        {
            id: 21,
            name: 'Снежок',
            image: mass.banners[21]
        },
        {
            id: 22,
            name: 'Вьюга',
            image: mass.banners[22]
        },
        {
            id: 23,
            name: 'День святого Валентина',
            image: mass.banners[23]
        },
        {
            id: 24,
            name: 'День святого Валентина',
            image: mass.banners[24]
        },
        {
            id: 25,
            name: 'День святого Валентина',
            image: mass.banners[25]
        },
        {
            id: 26,
            name: 'День святого Валентина',
            image: mass.banners[26]
        },
    ],
    [
        {
            id: 27,
            name: 'Кристальный Берсерк',
            image: mass.banners[27]
        },
        {
            id: 28,
            name: 'Кристальный Щит',
            image: mass.banners[28]
        },
        {
            id: 29,
            name: 'Бета Тест',
            image: mass.banners[29]
        },
        {
            id: 30,
            name: 'Релиз Кандидат',
            image: mass.banners[30]
        },
    ],
    [
        {
            id: 31,
            name: 'Ассоциация Начало',
            image: mass.banners[31]
        },
        {
            id: 32,
            name: 'Ассоциация Закат',
            image: mass.banners[32]
        },
        {
            id: 33,
            name: 'Ассоциация Элита',
            image: mass.banners[33]
        },
    ],
    [
        {
            id: 34,
            name: 'Старенький Подписчик',
            image: mass.banners[34]
        },
    ],
    [
        {
            id: 35,
            name: 'Весельчак',
            image: mass.banners[35]
        },
        {
            id: 36,
            name: 'Весельчак',
            image: mass.banners[36]
        },
        {
            id: 37,
            name: 'Весельчак',
            image: mass.banners[37]
        },
    ]
]

export default mass