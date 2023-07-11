import {useState} from "react";
import Header from "../header/header";
import s from './faq.module.scss'

const faq = () => {

    const Attachment = (props) => {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <div className={s.itemQuestion}>
                <div className={s.heading} onClick={() => setIsOpen(!isOpen)}>
                    <div className={s.headingText}>
                        {props.name}
                    </div>
                    <img src={'/arrowWhiteDown.svg'} className={isOpen ? s.rotate : s.arrowWhite}/>
                </div>

                <div className={s.specification}>
                    <div className={isOpen ? s.specificationComponent : s.specificationHideComponent}>
                        {props.children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={s.background}>
            <Header/>
            <Attachment name={'Что делать если аватарка на сайте отличается от дискорда'}>
                <div>Ты чипсина</div>
            </Attachment>
            <Attachment name={'Куда можно сообщить о баге?'}>
                <div>Удали лигу</div>
            </Attachment>
            <Attachment name={'Как узнать какие значки я могу использовать?'}>
                <div>Где ты хранишь свои секреты?</div>
            </Attachment>
            <Attachment name={'Я не могу скачать паспорт'}>
                <div>Хочу пива</div>
            </Attachment>
            <Attachment name={'Как сделать паспорт'}>
                <div>Ты гуль?</div>
            </Attachment>
            <Attachment name={'Что делать после создания паспорта?'}>
                <div>Переведи мне деньги на карту</div>
            </Attachment>
        </div>
    )
}
export default faq