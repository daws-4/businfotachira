interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}
export default function TextContrato({ children, ...props }: Props) {
 return (
   <p className="font-normal text-gray-700 dark:text-gray-400" {...props}>
     {children}
   </p>
 );
    
}
