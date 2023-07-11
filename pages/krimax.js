import Head from 'next/head'

export default function error() {

    return (
        <div className="container">
            <Head>
                <title>Паспорт Империи</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://marksheet.io/css/reset.css"/>
            </Head>

            <main>
                Какой все таки любознательный народ в наше время, ну вот зачем ты тут?(А может все таки тут никого
                 никогда ни будет и не было)
                Если тебе нужна какая то интересная информация, то держи:
                На создание сайта я потратил 6 месяцев работы большую часть времени я потратил на отлавливание багов и
                доведение до конца.
            </main>
        </div>
    )
}
