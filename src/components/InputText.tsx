import { InputHTMLAttributes } from "react";
import { LabelForm } from './Label';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function InputText(props: InputProps) {
  return (
    <div className="mt-4 pl-8 pr-6 py-8 w-full bg-white rounded-md border-2">
      {
        props.label ? <strong><LabelForm label={props.label} /></strong> : ""
      }
      <input
        {...props}
        className='bg-slate-50 py-3 px-4 rounded text-sm mt-1
        border-b-slate-500 text-gray-700
        placeholder:text-gray-400
        hover:border-gray-800
        focus:text-gray-800
        focus:border-gray-50  focus:outline-none max-[540px]:min-w-full min-w-[480px]
        focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border'

        value={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}