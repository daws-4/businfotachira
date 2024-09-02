interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputFilter(props: Props) {
  return (
    <input
      className="shadow appearance-none border rounded w-44 py-2 px-3 mx-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      {...props}
    />
  );
}

export default InputFilter;
