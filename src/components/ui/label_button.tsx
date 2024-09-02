interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export default function LabelFilter({ children, ...props }: Props) {
  return (
    <label className="bg-gray-800 mx-1 py-2 px-1 text-stone-100 hover:bg-gray-950 cursor-pointer pointer-events-auto rounded" {...props}>
      {children}
    </label>
  );
}
