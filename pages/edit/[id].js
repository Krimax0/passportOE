import Head from 'next/head'
import {useRouter} from "next/router";
import axios from "axios";
import env from "../../src/env";
import {useEffect, useState} from "react";

const useAxiosPost = (url, userId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const requestData = {
        type: 'GET_USER',
        data: {
            amountUsers: 1,
            searchUser: userId,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(url, requestData);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, userId]);

    return { data, loading, error };
};

const backUrl = process.env.NODE_ENV === 'production' ? `${env.Address}/api/handler` : `${env.localAddress}/handler`
const redirectUrl = process.env.NODE_ENV === 'production' ? "https://passportoe.ru/edit" : "http://localhost/edit"

export default function Home() {

    const router = useRouter()
    const {query: {id}} = router
    const decode = Buffer.from(id, 'hex').toString('utf-8') //Декодирование информации
    const urlMass = decode.split('&')
    const userId = urlMass[0]

    const { data, loading } = useAxiosPost(backUrl, userId);
    if (loading) return 'Загрузка...'

    localStorage.setItem('UserId', JSON.stringify(userId))
    localStorage.setItem('DateJoin', JSON.stringify(data?.users[0]?.joinDate.slice(0, -14) ?? ''))
    localStorage.setItem('Avatar', JSON.stringify(`https://cdn.discordapp.com/avatars/${userId}/${urlMass[1]}.png?size=256`))
    localStorage.setItem('Username', JSON.stringify(urlMass[3] === '0' ? urlMass[2] : `${urlMass[2]}#${urlMass[3]}`))
    localStorage.setItem('BannerValue', JSON.stringify([null, null]))

    router.push(redirectUrl)
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Крутых
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}