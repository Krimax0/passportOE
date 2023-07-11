import Head from 'next/head'
import {useEffect} from "react";
import {useRouter} from 'next/router'
import Hello from "../src/component/helloPage/hello";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        let avatar = JSON.parse(localStorage.getItem('Avatar'))
        let username = JSON.parse(localStorage.getItem('Username'))
        let dataJoin = JSON.parse(localStorage.getItem('DateJoin'))
        let userId = JSON.parse(localStorage.getItem('UserId'))
        if (avatar !== null && username !== null && dataJoin !== null && userId !== null) {
            if (process.env.NODE_ENV === 'production') {
                router.push("https://passportoe.ru/edit")
            }
            else {
                router.push("http://localhost/edit")
            }
        }
    }, [])
    return (
    <div className="container">
      <Head>
        <title>Паспорт Империи</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://marksheet.io/css/reset.css"/>
      </Head>

      <main >
          <Hello/>
      </main>
    </div>
  )
}
