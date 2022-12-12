import { useState, useEffect, InputHTMLAttributes } from 'react';
import { InputText } from './InputText';

interface TextProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    onAnswer: Function;
    questionId: string;
}

export function TextField(props: TextProps) {

    const [description, setdescription] = useState<string>("");

    useEffect(() => {sendAnswer(description) }, [description]);

    function sendAnswer(description: string) {
        if (props.onAnswer){
          props.onAnswer(
              {
                  primaryValue: description || null,
                  secondaryValue: null,
                  questionId: props.questionId,
                  radioIndex: null
              })
      }}
    

    return (
        <InputText label={props.label} key={props.questionId} onChange={(e:any) => setdescription(e.target.value)} type={props.type ?? "text"} min={props.min ?? "" }  max={props.max ?? "" }/>
    )
};
