import { RadioGroupDemo } from "../components/radioGroup/RadioGroup"
import { InputText } from "../components/InputText"

export function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <form className="min-h-screen max-w-5xl">
        <InputText label={"Como você tem se sentido emocionalmente nos últimos tempos?"} />
        <InputText label={"Aconteceu alguma coisa para você estar se sentindo assim?"} />
        <RadioGroupDemo label={"Você se considera uma pessoa nervosa? "} values={["Não", "Sim"]} />
        <RadioGroupDemo label="Em alguma época de sua vida, você consultou um médico por causa de nervosismo ou tristeza?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} />
        <RadioGroupDemo label="Alguma vez, por estar se sentindo nervoso ou triste, você tomou algum chá (por exemplo, erva-cidreira, maracujá), ou então, algum preparado à base de ervas?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} showDescription={true} />
        <RadioGroupDemo label="As vezes, quando estamos nervosos ou sentindo muita tristeza, podemos nos apegar em nossa fé, procurando pessoas que tem o dom de benzer e de curar... 
        Pode ser um padre, um pastor, um médium, ou mesmo alguém que nos foi indicado por um conhecido. Você já procurou alguém assim, para melhorar do nervosismo?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 3 meses"]} showDescription={true} />
        <RadioGroupDemo label="Alguma vez você já foi internado em hospital para tratamento dos nervos?" values={["Não", "Sim, há mais de um ano", "Sim, no último ano", "Sim, nos últimos 6 meses"]} />

      </form>
    </div>
  )
}