import Head from 'next/head'
import Canvas from "../../src/component/canvas";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Конструктор Паспортов</title>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://marksheet.io/css/reset.css"/>
            </Head>
            <main>
                <Canvas />
            </main>
        </div>
    )
}
