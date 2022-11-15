import { InputHTMLAttributes } from "react";
import { LabelForm } from './Label';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function InputText(props: InputProps) {
  return (
    <div className="mt-5">
      {
        props.label ? <strong><LabelForm label={props.label}/></strong> : ""
      }
      <input
        {...props}
        className='bg-zinc-800 py-3 px-4 rounded text-sm
        border-zinc-900 text-gray-300
        placeholder:text-zinc-500 
        hover:border-bluePurple-700 
        focus:text-gray-100
        focus:border-bluePurple-700  focus:outline-none 
        focus:ring-2 focus:ring-bluePurple-500 focus:ring-opacity-50 border'

        value={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}