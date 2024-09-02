import Link from "next/link";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CrudDelete({ children, ...props }: Props) {
  return (
    <button
      type="button"
      className="max-w-24 px-5 py-3 m-1.5 bg-red-500 border border-red-800 rounded-lg shadow hover:bg-red-600 dark:bg-red-600 dark:border-gray-700 dark:hover:bg-red-700 cursor-pointer pointer-events-auto rounded"
      {...props}
    >
      {children}
    </button>
  );
}

      

