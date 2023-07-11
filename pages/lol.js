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
                Какой все таки кайф писать код в 4 часа утра, а тебе вставать надо в 8.
                А тут я делаю безполезные посхалки которые никто не найдет
            </main>
        </div>
    )
}
