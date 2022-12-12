import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { RadioGroupDemo2 } from "../components/radioGroup2/RadioGroup2";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AnswerContext } from "../contexts/answer";
// interface CheckAgeProps {
//   legalAge: boolean;
// }

export function CheckAge() {
    const navigate = useNavigate();
    
    const { checkAge, setCheckAge } = useContext(AnswerContext);

    useEffect(() => {
        setCheckAge(undefined)
    }, []);

    async function passSectionOrStep(event: FormEvent) {
        event.preventDefault();
        if (checkAge == undefined) return toast.error("Por favor preencha todos os campos");
        if (!checkAge) return navigate("/agradecimentos")
        navigate("/sociodemografico")
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <form onSubmit={passSectionOrStep} className="flex flex-col justify-start items-center min-h-[83vh]">

            <div>
                <RadioGroupDemo2 label="Você é maior de idade (possui no mínimo 18 anos de idade completos)?"
                    values={["Sim, eu possuo 18 anos completos ou mais.", "Não, eu possuo menos de 18 anos de idade."]}
                    onAnswer={(ans: any) => ans.primaryValue == 0 ? setCheckAge(true) : setCheckAge(false)}
                    questionId="5000"
                />

                <div className="flex flex-col mx-1">
                    <Button value="Próxima"/>
                </div>
            </div>

        </form>
    );
}