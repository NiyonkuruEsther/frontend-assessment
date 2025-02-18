import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'filled' | 'outlined' | 'text';
  options: string[];
}

export default function Select({ options, ...props }: SelectProps) {
  return (
    <select id={props.name} className="w-full bg-transparent cursor-pointer hover:text-tertiary-400">
      {options.map((option) => (
        <option key={option} value="US">
          {option}
        </option>
      ))}
    </select>
  );
}
