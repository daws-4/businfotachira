interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}
export default function FormCrud({ children, ...props }: Props) {
    return (
      <form
        className="flex sm:flex-row flex-col sm:w-sm w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        {...props}
      >
        {children}
      </form>
    );


}
