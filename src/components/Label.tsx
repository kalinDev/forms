import { LabelHTMLAttributes } from 'react';
import * as Label from '@radix-ui/react-label';


interface LabelProps extends LabelHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function LabelForm(props: LabelProps) {
  return (
    <div
      className='flex flex-col py-2 text-yellow-500'
    >

      <Label.Root htmlFor={props.label}>
        {props.label}
      </Label.Root>

    </div>
  )
};

