import * as RadioGroup from '@radix-ui/react-radio-group';
import './styles.css';
import { LabelForm } from '../Label';
import { InputText } from "../InputText"
import { useState, useEffect, InputHTMLAttributes, useRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    values: any[];
    label: string;
    showDescription?: boolean;
    onAnswer: Function;
    questionId: string;
}

export function RadioGroupDemo(props: RadioProps) {

    const [radioValue, setRadioValue] = useState<string>("");
    const [description, setdescription] = useState<string>("");

    useEffect(() => { sendAnswer(radioValue, description) }, [radioValue, description]);

    function sendAnswer(radioValue: string, description: string) {
        props.onAnswer(
            {
                value: radioValue || null,
                description: description || null,
                questionId: props.questionId
            })
    }



    let radios = props.values.map((item, index) => {
        return (

            <div className='flex items-center gap gap-4' key={index + props.questionId}>
                <RadioGroup.Item
                    className="bg-white w-6 h-6 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                    value={item.value}
                    onClick={e => {
                        if (e.currentTarget.value == "0") {
                            setdescription("")
                        }
                        setRadioValue(e.currentTarget.value)

                    }}
                >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <LabelForm label={item.label} htmlFor={index + props.questionId} />
            </div>
        )
    })

    return (
        <div className='mt-4 bg-white rounded-md border-2 pl-8 pr-80 py-6 mb-5'>
            <LabelForm label={props.label} />
            <RadioGroup.Root className="flex flex-col gap gap-2.5 mt-3" defaultValue="default" aria-label="View density">
                <div className='flex flex-col gap gap-2 '>
                    {radios}
                </div>
            </RadioGroup.Root>

            {props.showDescription && Number(radioValue) > 0
                ? <InputText placeholder='Descreva por favor' value={description} onChange={(e) => setdescription(e.target.value)} />
                : ""}
        </div>
    )
};
