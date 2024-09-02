import Link from "next/link";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function CrudUpdate({ children, ...props }: Props) {
  return (
    <Link
      href={""}
      {...props}
      className="max-w-24 px-5 py-3 m-1.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-green-700 dark:border-gray-700 dark:hover:bg-green-800 cursor-pointer pointer-events-auto rounded"
    >
      {children}
    </Link>
  );
}
