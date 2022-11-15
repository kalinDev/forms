import * as RadioGroup from '@radix-ui/react-radio-group';
import './styles.css';
import { LabelForm } from '../Label';
import { InputText } from "../InputText"

interface RadioProps {
    values: string[];
    label: string;
    showDescription?: boolean 
}

export function RadioGroupDemo(props: RadioProps) {

    const random = Math.random()
    let radios = props.values.map((item, index) => {
        return (

            <div className='flex items-center gap gap-4' key={Math.random()}>
                <RadioGroup.Item
                    className="bg-white w-6 h-6 rounded-xl shadow-sm shadow-white hover:bg-violet-200"
                    value={String(index)}
                    id={random + String(index)}
                >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <LabelForm label={item} htmlFor={random + String(index)} />
            </div>
        )
    })

    return (
        <div className='mt-10'>
            <strong><LabelForm label={props.label}/></strong>
            <RadioGroup.Root className="flex flex-col gap gap-2.5" defaultValue="default" aria-label="View density">
                <div className='flex flex-col gap gap-2 '>
                    {radios}
                </div>
            </RadioGroup.Root>

            {props.showDescription ? <InputText placeholder='Descreva por favor'/> : "" }
        </div>
    )
};
