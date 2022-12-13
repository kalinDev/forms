import { useContext, useEffect } from "react";
import { AnswerContext } from "../contexts/answer";
import ImgAgradecimento from "../assets/handshake.png";

export function Acknowledgment() {

    const { setCheckAge } = useContext(AnswerContext);

    useEffect(() => {
        setCheckAge(undefined)
    }, []);

    return (
        <div className='bg-slate-100 min-h-[83vh] mx-auto flex flex-col justify-center items-center'>
            <p className='text-bluePurple-500 text-center font-semibold text-2xl mb-5 min-[960px]:text-3xl'>
                A nossa entrevista terminou aqui!
            </p>
            <img src={ImgAgradecimento} alt="Apertão de mãos" width="25%" height="25%" />
            <p className='text-bluePurple-500  text-center font-semibold text-lg mt-5 min-[960px]:text-2xl'>
                Obrigado pela sua colaboração
            </p>
        </div>
    )
}