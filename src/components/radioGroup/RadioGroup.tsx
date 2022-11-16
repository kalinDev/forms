import * as RadioGroup from '@radix-ui/react-radio-group';
import './styles.css';
import { LabelForm } from '../Label';
import { InputText } from "../InputText"
import { useState, useEffect, FormEvent, ChangeEvent, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    values: string[];
    label: string;
    showDescription?: boolean;
    onAnswer: Function
}

export function RadioGroupDemo(props: RadioProps) {
    const random = Math.random()

    const [radioValue, setRadioValue] = useState<string>();
    const [description, setdescription] = useState<string>();

    useEffect(() => sendAnswer, [radioValue, description]);

    function sendAnswer(){
        props.onAnswer(
        {
            pergunta: props.label,
            valor: radioValue || null ,
            descricao: description || null
        })
    }

    let radios = props.values.map((item, index) => {
        return (

            <div className='flex items-center gap gap-4' key={Math.random()}>
                <RadioGroup.Item
                    className="bg-white w-6 h-6 rounded-xl shadow-md shadow-slate-800 hover:bg-violet-200"
                    value={String(index)}
                    id={random + String(index)}
                    onClick={e => setRadioValue(e.currentTarget.value)}
                >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <LabelForm label={item} htmlFor={random + String(index)} />
            </div>
        )
    })

    return (
        <div className='mt-10 bg-white p-4 rounded-md border-2'>
            <strong><LabelForm label={props.label} /></strong>
            <RadioGroup.Root className="flex flex-col gap gap-2.5" defaultValue="default" aria-label="View density">
                <div className='flex flex-col gap gap-2 '>
                    {radios}
                </div>
            </RadioGroup.Root>

            {props.showDescription && Number(radioValue) > 0 ? <InputText placeholder='Descreva por favor' value={description} onChange={(e) => setdescription(e.target.value)} /> : ""}
        </div>
    )
};
