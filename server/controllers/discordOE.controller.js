require('dotenv').config()
const {Client, Intents} = require('discord.js')
const client = new Client({
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "клубочек",
            type: 0,
        }],
    },
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
    fetchAllMembers: true
})
client.login(process.env.BOT_TOKEN)
client.on('ready', async () => console.log('Запуск'))

exports.test = async (req, res) => {
  res.send('test')
}

exports.get = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    console.log('Запрос выполнен')

    try {
        const mass = {}
        mass.users = []
        const Msg = (msg) => {
            res.send(msg)
        }
        if (!req.body || !req.body.type || !req.body.data) {
            Msg("Ошибка в запросе")
            return
        }
        const body = req.body

        console.log(body.type)

        if (body.type === "PING") {
            res.send('PONG!')
        }

        if (body.type === "GET_RANDOM_USER") {
            const Members = await client.guilds.cache.get('300276721075355649').members.fetch()
            const log = Members.random(body.data.amountUsers)

            res.send({
                users:
                    log.map((userDiscord) => ({
                        userId: userDiscord.user.id,
                        nickname: userDiscord.displayName,
                        hash: userDiscord.user.discriminator,
                        avatar: userDiscord.user.avatar,
                    }))
            }).status(200)
        } else if (body.type === "GET_USER") {
            if (!body?.data?.searchUser) {
                Msg("Пользователь не указан")
            }
            const searchParameter = body?.data?.searchUser
            const isNumeric = n => !isNaN(n);
            const Members = await client.guilds.cache.get('300276721075355649').members

            if (isNumeric(searchParameter)) {
                const findUserById = (await Members.fetch()).get(searchParameter)
                mass.users = [findUserById]
            } else {
                const findUserByNickname = await Members.search({query: searchParameter, limit: 50})
                mass.users = findUserByNickname
            }

            if (JSON.stringify(mass.users) === '[]' || JSON.stringify(mass.users) === '[null]') return res.send({users: []}).status(204)
            return res.send({
                searchData: searchParameter,
                users: mass.users.map((userDiscord) => ({
                    userId: userDiscord.user.id,
                    nickname: userDiscord.displayName,
                    hash: userDiscord.user.discriminator,
                    avatar: userDiscord.user.avatar,
                    joinDate: userDiscord.joinedAt
                }))
            }).status(200)
        } else if (body.type === "GET_USERS_LIST") {
            const arrayUsersId = body?.data?.id
            const Members = await client.guilds.cache.get('300276721075355649').members.fetch()
            const filterUsers = Members.filter(discordUser => arrayUsersId.indexOf(discordUser.user.id) > -1)

            res.send(
                filterUsers.map((userDiscord) => ({
                    userId: userDiscord.user.id,
                    nickname: userDiscord.displayName,
                    hash: userDiscord.user.discriminator,
                    avatar: userDiscord.user.avatar,
                }))
            ).status(200)
        } else {
            res.send(
                `Данного запроса не существует 
                типы запросов: 
                "GET_RANDOM_USER"
                "GET_USER"
                "GET_USERS_LIST"`)
        }
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
};