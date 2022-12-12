import { LabelHTMLAttributes } from 'react';
import * as Label from '@radix-ui/react-label';


interface LabelProps extends LabelHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function LabelForm({ label }: LabelProps) {
  return (
    <div className='text-zinc-800 font-semibold'>

      <Label.Root htmlFor={label}>
        {label}
      </Label.Root>

    </div>
  )
};