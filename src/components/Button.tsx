interface ButtonProps {
  value: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      type='submit'
      className='bg-bluePurple-500 px-10 h-12 rounded-md font-semibold flex justify-center items-center gap-3 hover:bg-bluePurple-700 mt-5 text-gray-200'
    >
      {props.value}
    </button>
  );
};