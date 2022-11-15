import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function InputText(props: InputProps) {
  return (
    <input
      {...props}
      className='bg-zinc-800 py-3 px-4 rounded text-sm
        border-zinc-900 text-gray-300
        placeholder:text-zinc-500 
        hover:border-bluePurple-700 
        focus:text-gray-100
        focus:border-bluePurple-700  focus:outline-none 
        focus:ring-2 focus:ring-bluePurple-500 focus:ring-opacity-50 border'
      />
  );
}