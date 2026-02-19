import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-slate-100 disabled:text-slate-400 transition-all
        ${className}
      `}
      {...props}
    />
  );
};
