interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}
export default function TitleContrato({ children, ...props }: Props) {
    return (
      <h5
        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        {...props}
      >
        {children}
      </h5>
    );
    

}