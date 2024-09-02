import { LiHTMLAttributes } from "react";

interface Props
  extends React.DetailedHTMLProps<
    LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {}

export default function ListElement({ children, ...props }: Props) {
  return (
    <li
      {...props}
      className="border-2 border rounded border-zinc-400 px-12 py-4 bg-slate-800 mb-2"
    >
      <h5 className="font-sans text-lg">{children}</h5>
    </li>
  );
}
