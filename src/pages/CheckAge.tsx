import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { RadioGroupDemo2 } from "../components/radioGroup2/RadioGroup2";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
// interface CheckAgeProps {
//   legalAge: boolean;
// }

export function CheckAge() {
    const navigate = useNavigate();
    const [legalAge, setlegalAge] = useState<boolean>();

    async function passSectionOrStep(event: FormEvent) {
        event.preventDefault();
        if (legalAge == undefined)return toast.error("Por favor preencha todos os campos");
        if (!legalAge) return navigate("/agradecimentos")
        navigate("/sociodemografico")
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <form onSubmit={passSectionOrStep} className="flex flex-col justify-start items-center min-h-[81vh]">

            <div>
                <RadioGroupDemo2 label="Você é maior de idade (possui no mínimo 18 anos de idade completos)?"
                    values={["Sim, eu possuo 18 anos completos ou mais.", "Não, eu possuo menos de 18 anos de idade."]}
                    onAnswer={(ans: any) => ans.primaryValue == 0 ? setlegalAge(true) : setlegalAge(false)}
                    questionId="5000"
                />

                <div className="flex flex-col items-end">
                    <Button value="Próxima"/>
                </div>
            </div>

        </form>
    );
}