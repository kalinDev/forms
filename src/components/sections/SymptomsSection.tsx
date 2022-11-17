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

export function SymptomsSection(props: props) {
    return (

        <div className="flex flex-col justify-center items-center bg-slate-50">
          <form className="min-h-screen max-w-5xl mt-5 mb-5">
            <h1 className='text-bluePurple-500 text-2xl font-bold'>SINTOMAS SOMÁTICOS</h1>
            <hr />
            <InputText label={"Você tem sentido alguma dor recentemente ou indisposição, como por exemplo, dor de cabeça, dor nas costas ou má digestão??"}  placeholder='Descreva por favor'/>
            <InputText label={"Você tem sentido algum mal-estar ultimamente? "}  placeholder='Descreva por favor'/>
            <RadioGroupDemo label={"Você acha que essa [dor/mal-estar] aparece ou piora quando você está mais nervoso ou angustiado? "} values={["Não", "Sim ou em dúvida"]}  onAnswer={(answer: Answer) => props.onAnswer(answer)}  questionId="9"/>
          
          </form>
        </div>
      )                                                                                       
    }