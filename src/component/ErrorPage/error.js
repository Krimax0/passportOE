import Link from "next/link"
import s from './error.module.scss'

const Error = () => {
    return (
        <div className={s.background}>
            <div className={s.wrapper}>
                <div className={s.board}>
                    <div className={s.logo}>
                        <div className={s.text}>
                            OBSIDIAN EMPIRE
                        </div>
                    </div>
                    <div className={s.big_text}>Причины попадания на страницу:</div>
                    <div className={s.text}>1) Вас нету на OE.</div>
                    <div className={s.text}>2) Несуществующая ссылка</div>
                    <div className={s.text}>3) Случайная ошибка</div>
                    <div className={s.back_text}>Советуем вернуться на <Link href={'/'}><a className={s.link}>главную</a></Link></div>
                </div>
            </div>
        </div>
    );
};

export default Error;