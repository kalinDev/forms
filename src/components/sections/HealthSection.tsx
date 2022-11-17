import { RadioGroupDemo } from "../radioGroup/RadioGroup"
import { InputText } from "../InputText"

interface Answer{
    questionId: string;
    value: string;
    description: string 
}

interface props{
    onAnswer: Function;
}

export function HealthSection(props: props) {
  return (

    <div className="flex flex-col justify-center items-center bg-slate-50">
      <form className="min-h-screen max-w-5xl mt-5 mb-5">
        <h1 className='text-bluePurple-500 text-2xl font-bold'>SAÚDE MENTAL</h1>
        <hr />
        <InputText label={"Como você tem se sentido emocionalmente nos últimos tempos?"}  placeholder='Descreva por favor'/>
        <InputText label={"Aconteceu alguma coisa para você estar se sentindo assim?"}  placeholder='Descreva por favor'/>
        <RadioGroupDemo label={"Você se considera uma pessoa nervosa? "} values={["Não", "Sim"]}  onAnswer={(answer: Answer) => props.onAnswer(answer)}  questionId="3"/>
        <RadioGroupDemo label="Em alguma época de sua vida, você consultou um médico por causa de nervosismo ou tristeza?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} onAnswer={(answer: Answer) => props.onAnswer(answer)} questionId="4"/>
        <RadioGroupDemo label="Alguma vez, por estar se sentindo nervoso ou triste, você tomou algum chá (por exemplo, erva-cidreira, maracujá), ou então, algum preparado à base de ervas?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} showDescription={true} onAnswer={(answer: Answer) => props.onAnswer(answer)} questionId="5"/>
        <RadioGroupDemo label="As vezes, quando estamos nervosos ou sentindo muita tristeza, podemos nos apegar em nossa fé, procurando pessoas que tem o dom de benzer e de curar... 
        Pode ser um padre, um pastor, um médium, ou mesmo alguém que nos foi indicado por um conhecido. Você já procurou alguém assim, para melhorar do nervosismo?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} showDescription={true} onAnswer={(answer: Answer) => props.onAnswer(answer)} questionId="6"/>
        <RadioGroupDemo label="Alguma vez você já foi internado em hospital para tratamento dos nervos?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 6 meses"]} onAnswer={(answer: Answer) => props.onAnswer(answer)} questionId="7"/>
      
      </form>
    </div>
  )                                                                                       
}