interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SingInButtom({children, ...props}: Props) {
return(<button
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-950 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-10 font-arial"
              {...props}
            >
              {children}
            </button>)

}