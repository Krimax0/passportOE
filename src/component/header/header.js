import s from "./header.module.scss";
import env from '../../env'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Header = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.setItem('Avatar', null)
        localStorage.setItem('Username', null)
        localStorage.setItem('UserId', null)
        localStorage.setItem('DateJoin', null)
        if (process.env.NODE_ENV === 'production') {
            router.push(env.Address)
        } else {
            router.push(env.localAddress)
        }
    }
    const [avatar, setAvatar] = useState()
    const [username, setUsername] = useState()
    useEffect(() => {
        setAvatar(JSON.parse(localStorage.getItem('Avatar')))
        setUsername(JSON.parse(localStorage.getItem('Username')))
    }, [])
    return (
        <header className={s.header}>
            <div className={s.avatar_section} onClick={() => logout()}>
                <img onError={() => logout()}
                     src={"https://cdn.discordapp.com/avatars/419135385730416640/ef63124af28b93fb3774ae4b46c75782.png?size=256"}
                     alt="Аватар"
                     className={s.avatar}/>
                <div className={s.username_section}>
                    <div className={s.username}>{username}</div>
                    <div className={s.invisible_text}>Выйти из аккаунта</div>
                </div>
            </div>

            <div className={s.logo}>OBSIDIAN EMPIRE</div>
        </header>
    )
}

export default Header