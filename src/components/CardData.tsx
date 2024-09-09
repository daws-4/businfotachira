import React, { ReactNode } from "react";

interface CardDataStatsProps {
  username?: string;
  text?: string;
  title: string;
  subtitle?: string;
  subtitle2?: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  id:string;
  children?: ReactNode;
}

const CardData: React.FC<CardDataStatsProps> = ({
  username,
  text,
  subtitle,
  subtitle2,
  title,
  rate,
  levelUp,
  levelDown,
  id,
  children
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="mt-4 flex items-end justify-between pb-12 ">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {title}
          </h4>
          <h4 className="text-md font-bold text-black dark:text-white">
            {subtitle}
          </h4>
          <h4 className="text-md font-bold text-black dark:text-white">
            {subtitle2}
          </h4>
          <span className="text-sm font-medium">{text}</span>
        </div>
           
      </div>
      <div className="flex justify-end">
            Creado el: {rate}
        </div>  
        
       {children}
             
       
    </div>
  );
};

export default CardData;
