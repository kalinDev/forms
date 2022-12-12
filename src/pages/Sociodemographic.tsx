import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { RadioGroupDemo2 } from "../components/radioGroup2/RadioGroup2";
import { useContext, useEffect, useRef, useState } from "react";
import { AnswerContext } from "../contexts/answer";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { LabelForm } from "../components/Label";

export function Sociodemographic() {

    const navigate = useNavigate();

    const { answer, checkAge, setCheckAge } = useContext(AnswerContext);

    let firstLoad = useRef(true)

    useEffect(() => {
        if (firstLoad.current && checkAge == undefined) {
            navigate("/agradecimentos")
        }

        firstLoad.current ?
            firstLoad.current = false : navigate("/") //agradecimentos

    }, [checkAge]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (Object.values(answer).findIndex((val: any) => ["", null, undefined].includes(val)) >= 0) {
            return toast.error("Por favor preencha todos os campos");
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate("/questoes")
        }
    }

    return (
        <>
            {checkAge ?
                <div className="flex justify-center items-center mt-2">
                    <div className=" flex flex-col justify-center items-center ">
                        {/* bg-white rounded-md border-2 */}

                        <h2 className="border-b-2 pb-2 text-center text-2xl">Variáveis Sociodemográficas</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="flex flex-col items-start">

                                <TextField questionId="5051" label="Número de matrícula UNEB" placeholder="Seu número de matricula, utilizando apenas números" onAnswer={(ans: any) => answer["matricula"] = ans.primaryValue} type="number" />

                                <TextField questionId="5052" label="Email" placeholder="Preencha com seu e-mail principal" onAnswer={(ans: any) => answer["email"] = ans.primaryValue} type="email" />

                                <TextField questionId="5053" label="Idade" placeholder="Sua idade" onAnswer={(ans: any) => answer["idade"] = ans.primaryValue} type="number" min={18} max={110} />

                                <RadioGroupDemo2 label="Sexo:"
                                    values={["Masculino", "Feminino"]}
                                    onAnswer={(ans: any) => answer["sexo"] = ans.primaryValue}
                                    questionId="5001"
                                />

                                <RadioGroupDemo2 label="Graduação que está cursando atualmente na UNEB"
                                    values={["Enfermagem", "Medicina"]}
                                    onAnswer={(ans: any) => answer["curso"] = ans.primaryValue}
                                    questionId="5002"
                                />

                                <div className="mt-4 pl-8 pr-6 py-8 w-full bg-white rounded-md border-2 ">
                                    <LabelForm label="Ano do curso de graduação" />
                                    <RadioGroup.Root onChange={(radio: any) => answer["anoCurso"] = (radio.target.value)} className="flex flex-col gap gap-2.5 " defaultValue="default" aria-label="View density">
                                        <div className='flex max-[540px]:flex-col min-[541px]:gap-20 my-4'>
                                            <div>
                                                <div className='flex items-center gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="1º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold" >1º Ano</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="2º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">2º Ano</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="3º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold" >3º Ano</label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="4º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold" >4º Ano</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="5º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">5º Ano</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="6º Ano"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">6º Ano</label>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup.Root>
                                </div>


                                <div className="mt-4 pl-8 pr-6 py-8 w-full bg-white rounded-md border-2 ">
                                    <LabelForm label="Semestre atual da graduação" />
                                    <RadioGroup.Root onChange={(radio: any) => answer["semestre"] = (radio.target.value)} className="flex flex-col gap gap-2.5 " defaultValue="default" aria-label="View density">
                                        <div className='flex max-[540px]:flex-col min-[541px]:gap-20 my-4'>
                                            <div>
                                                <div className='flex items-center gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="1º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">1º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="2º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">2º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="3º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">3º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="4º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">4º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="5º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">5º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="6º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">6º Semestre</label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="7º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">7º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="8º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">8º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="9º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">9º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="10º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">10º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="11º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">11º Semestre</label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="12º Semestre"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">
                                                        12º Semestre
                                                    </label>
                                                </div>
                                                <div className='flex items-center gap gap-4 mt-2'>
                                                    <RadioGroup.Item
                                                        className="bg-slate-100 w-5 h-5 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                                                        value="Estou dessemestralizado(a)"
                                                    >
                                                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                                                    </RadioGroup.Item>
                                                    <label className="ml-2 text-zinc-800 font-semibold">
                                                        Estou dessemestralizado(a)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup.Root>
                                </div>

                                <RadioGroupDemo2 label="Renda familiar mensal média"
                                    values={["Até 2 salários mínimos", "Entre 2 e 4 salários mínimos", "Entre 4 e 10 salários mínimos", "Entre 10 e 20 salários mínimos", "Acima de 20 salários mínimos"]}
                                    onAnswer={(ans: any) => answer["renda"] = ans.primaryValue}
                                    questionId="5003"
                                />


                                <RadioGroupDemo2 label="Eu considero ter uma rede de apoio familiar sólida"
                                    values={["Concordo fortemente", "Concordo", "Discordo", "Discordo fortemente"]}
                                    onAnswer={(ans: any) => answer["apoioFamiliar"] = ans.primaryValue}
                                    questionId="5004"
                                />

                                <RadioGroupDemo2 label="Status de relacionamento"
                                    values={["Solteiro", "Namorando", "Casado", "Viúvo"]}
                                    onAnswer={(ans: any) => answer["relacionamento"] = ans.primaryValue}
                                    questionId="5005"
                                />

                                <RadioGroupDemo2 label="O participante considera ter dificuldade para fazer amigos?"
                                    values={["Sim", "Não"]}
                                    onAnswer={(ans: any) => answer["antissocial"] = ans.primaryValue}
                                    questionId="5006"
                                />

                                <RadioGroupDemo2 label="Autoavaliação do desempenho escolar"
                                    values={["Péssimo", "Regular", "Bom", "Excelente"]}
                                    onAnswer={(ans: any) => answer["autoavaliacao"] = ans.primaryValue}
                                    questionId="5007"
                                />

                                <RadioGroupDemo2 label="O participante pensa ou já pensou em desistir do curso de graduação?"
                                    values={["Não, nunca", "Sim, mas não penso mais", "Sim, ainda penso"]}
                                    onAnswer={(ans: any) => answer["desistirCurso"] = ans.primaryValue}
                                    questionId="5008"
                                />

                                <RadioGroupDemo2 label="Número de horas de estudo, por semana, nos últimos 3 meses"
                                    values={["Poucas (<24h)", "Moderadas (>24h - <40h)", "Muitas (>40h)"]}
                                    onAnswer={(ans: any) => answer["horasEstudo"] = ans.primaryValue}
                                    questionId="5009"
                                />

                            </div>

                            <div className="flex flex-col mx-1 mb-4">
                                <Button value="Continuar" />
                            </div>

                        </form>

                    </div>
                </div>
                :
                setCheckAge(undefined)
            }

        </>
    );
}