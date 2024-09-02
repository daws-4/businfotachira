interface Props extends React.HTMLAttributes<Element> {}
export default function Secondtitle({children, ...props}: Props) {

    return(
        <h2 className=" text-2xl font-bold font-arial text-white-800  px-10 py-5" {...props}>{children}</h2>
    )
}