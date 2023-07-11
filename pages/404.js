import Head from 'next/head'
import Error from '../src/component/ErrorPage/error'

export default function error() {
    return (
        <div className="container">
            <Head>
                <title>Ошибка!</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://marksheet.io/css/reset.css"/>
            </Head>
            <Error/>
        </div>
    )
}
