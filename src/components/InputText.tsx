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
        className='bg-slate-50 py-3 px-4 rounded text-sm
        border-slate-500 text-gray-600
        placeholder:text-gray-600 
        hover:border-x-gray-900
        focus:text-gray-900
        focus:border-gray-50  focus:outline-none 
        focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border'

        value={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}