interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export default function LabelCrud({ children, ...props }: Props) {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" {...props}>
      {children}
    </label>
  );
}
