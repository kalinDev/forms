import * as RadioGroup from '@radix-ui/react-radio-group';
import './styles.css';
import { LabelForm } from '../Label';
import { InputText } from "../InputText"
import { useState, useEffect, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    values: any[];
    label: string;
    showRadioWithChildren?: boolean;
    showDescription?: boolean;
    onAnswer: Function;
    questionId: string;
    questionDescription: string;
    showOtherType?: boolean;
    questionType: number;
    sectionId? : number
}

export function RadioGroupDemo(props: RadioProps) {

    const [radioValue, setRadioValue] = useState<string>("");
    const [radioIndex, setRadioIndex] = useState<number>(0);
    const [description, setdescription] = useState<string>("");
    const [lastRadioIndex, setLastRadioIndex] = useState<number>();

    useEffect(() => { sendAnswer(radioValue, description) }, [radioValue, description, radioIndex]);

    function sendAnswer(radioValue: string, description: string) {
        props.onAnswer(
            {
                primaryValue: radioValue || null,
                secondaryValue: description || null,
                questionId: props.questionId,
                radioIndex: radioIndex,
                type: props.questionType,
                sectionId: props.sectionId 
            })
    }

    function GenerateRadiosChildren() {
        return props.values.map((item, index) => {
            if (!item.isChildren) return
            return (
                <div className='flex items-center gap gap-4' key={index + props.questionId + "children"}>
                    <RadioGroup.Item
                        className="bg-white w-6 h-6 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                        value={`${item.value}#${index}#children`}
                        onClick={e => {
                            setdescription((e.currentTarget.value).split('#')[0])
                        }}
                    >
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                    </RadioGroup.Item>
                    <LabelForm label={item.label} htmlFor={index + props.questionId + "children"} />
                </div>
            )
        })
    }


    let radios = props.values.map((item, index) => {
        if (item.isChildren) return

        return (
            
            <div className='flex items-center gap gap-4' key={index + props.questionId}>
                <RadioGroup.Item
                    className="bg-white w-6 h-6 rounded-xl shadow-md shadow-slate-800 hover:bg-slate-200"
                    value={`${item.value}#${index}`}
                    onClick={e => {
                        if(props.showOtherType && lastRadioIndex != Number((e.currentTarget.value).split('#')[0])){
                            setdescription("")
                        }
                        else if ((e.currentTarget.value).split('#')[0] == "0") {
                            setdescription("")
                        }
                        console.log(Number((e.currentTarget.value).split('#')[1]))
                        setRadioValue((e.currentTarget.value).split('#')[0])
                        setRadioIndex(Number((e.currentTarget.value).split('#')[1]))
                        setLastRadioIndex(props.values.length -1)
                    }}
                >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <LabelForm label={item.label} htmlFor={index + props.questionId} />
            </div>
        )
    })

    return (
        <div className='mt-4 pl-8 pr-6 py-8 w-full bg-white rounded-md border-2'>
            <LabelForm label={props.label} />
            <span className='text-xs'>{props.questionDescription}</span>
            <RadioGroup.Root className="flex flex-col gap-2.5 mt-3" defaultValue="default" aria-label="View density">
                <div className='flex flex-col gap-2'>
                    {radios}
                </div>
            </RadioGroup.Root>

            {props.showDescription && Number(radioValue) > 0
                ? <InputText placeholder='Descreva por favor' value={description} onChange={(e) => setdescription(e.target.value)} />
                : ""}

            {props.showOtherType && Number(radioIndex) == lastRadioIndex
                ? <InputText placeholder='Descreva por favor' value={description} onChange={(e) => setdescription(e.target.value)} />
                : ""
            }

            {props.showRadioWithChildren && Number(radioValue) > 0
                ? <>
                    <RadioGroup.Root className="flex flex-col gap-2.5 mt-5" defaultValue="default" aria-label="View density">
                        <LabelForm label={"Qual?"} />

                        <div className='flex flex-col gap-2 '>
                            {
                                GenerateRadiosChildren()
                            }
                        </div>
                    </RadioGroup.Root>
                </>
                : ""
            }
        </div>
    )
};
