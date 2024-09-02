import Link from "next/link";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function CampoContrato({ children, ...props }: Props) {
  return (
    <Link href={''} {...props}
      className="block max-w-80 p-5 m-1.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-950"
    >
      {children}
    </Link>
  );
}
