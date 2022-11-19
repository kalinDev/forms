import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function Button({ value }: ButtonProps) {
  return (
    <button
      type='submit'
      className='px-10 h-12 mt-5 rounded-md font-semibold
      flex justify-center items-center
      text-gray-100
      bg-cyan-600 hover:bg-cyan-700 
      transition-colors duration-300'
    >
      {value.toUpperCase()}
    </button>
  );
};