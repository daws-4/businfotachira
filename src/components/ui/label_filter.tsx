interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export default function LabelButton({children, ...props}: Props) {

    return(
        <label className="bg-gray-800 py-2 px-1 text-stone-100 rounded" {...props}>{children}</label>
    )
}
