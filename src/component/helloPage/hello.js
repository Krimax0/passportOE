import s from './hello.module.scss'
import env from '../../env'

const Hello = () => {
    const discordLogin = () => {

        if (process.env.NODE_ENV === 'production') {
            return `${env.Address}/api`
        }
        else {
            return `${env.localAddress}`
        }
    }
    return (
        <div className={s.background}>
            <div className={s.wrapper}>
                <div className={s.menu_background}>
                    <div className={s.menu}>
                        <div className={s.logo}>
                            <div className={s.text}>
                                OBSIDIAN EMPIRE
                            </div>
                        </div>
                        <div className={s.main}>
                            <div className={s.under_logo}>Мы рады приветствовать вас на проекте</div>
                        </div>


                        <div className={s.grid_section}>
                            <div className={s.text}>
                                <div className={s.section_text_logo}>
                                    <div className={s.text_logo}>
                                        PassportOE
                                    </div>
                                </div>
                                <div className={s.text_under_logo}>
                                    Сайт для облегчения процесса
                                </div>
                                <div className={s.text_under_logo}>
                                    создания паспортов
                                </div>
                            </div>
                            <img src={'/HelloCards.png'}
                                 className={s.img_passport}
                                 alt={'Картинка'}/>
                        </div>

                        <div className={s.btn_background}>
                            <a href={discordLogin()} className={s.btn}>
                                <a className={s.text}>Авторизоваться</a>
                                <svg className={s.img} aria-hidden="false" width="42" height="30"
                                     viewBox="0 0 28 20">
                                    <path fill="currentColor"
                                          d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hello;