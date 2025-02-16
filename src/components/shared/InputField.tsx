import { InputHTMLAttributes } from 'react';


import { IconFunction } from '../../routes/navigationLinks';

interface InputFiedProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixIcon?: IconFunction;
}

export default function InputField({ label, prefixIcon, ...props }: InputFiedProps) {
  return (
    <div
      className={`flex flex-col w-full border-2 gap-1 p-3 ${
        label && 'py-1'}
      `}
    >
      {label && (
        <label htmlFor={props.name} className="block text-sm text-tertiary-400 dark:text-white">
          {label}
        </label>
      )}
      <div className="w-full flex items-center text-tertiary-800 font-bold gap-1">
        {prefixIcon && prefixIcon?.({})}
        <input {...props} id={props.name} className="w-full bg-transparent focus-within:outline-none" />
      </div>
    </div>
  );
}
