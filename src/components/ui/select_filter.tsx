interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function SelectFilter(props: Props) {
  return (
    <select
      className="shadow appearance-none border rounded w-100 py-2 px-3 mx-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      {...props}
    />
  );
}

export default SelectFilter;
