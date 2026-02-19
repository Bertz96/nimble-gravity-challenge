import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({
  children,
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg 
        hover:bg-blue-700 active:scale-95 transition-all cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
      {...props}>
      {isLoading ? (
        <span className='flex items-center gap-2'>
          <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
          Enviando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
