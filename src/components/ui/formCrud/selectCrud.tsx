interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function SelectCrud({ children, ...props }: Props) {
  return (
    <select
      className="min-w-44 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      {...props}
    >{children}</select>
  );
}

//   className =
//     "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
