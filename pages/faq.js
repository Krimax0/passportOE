import Head from 'next/head'
import FAQ from '../src/component/FAQPage/FAQ'

export default function faq() {
    return (
        <div className="container">
            <Head>
                <title>Помощь</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://marksheet.io/css/reset.css"/>
            </Head>

            <main>
                <FAQ/>
            </main>
        </div>
    )
}
