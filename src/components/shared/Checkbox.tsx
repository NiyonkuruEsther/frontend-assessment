interface CheckboxProps {
  label?: string;
}

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-black rounded-sm focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        {label && <span className="font-bold text-tertiary-800 text-sm">{label}</span>}
      </div>
    </>
  );
}
