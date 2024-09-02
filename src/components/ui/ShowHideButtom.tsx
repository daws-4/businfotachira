'use client'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ShowHideButtom ({children, ...props}: Props){

    return (

        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center"
          {...props}
        >
         {children}
        </button>
    );
}