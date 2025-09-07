import type { ReactNode } from "react";

import Footer from "./Footer";
import Naver from "./Naver";


interface IProps{
   children: ReactNode
}

function CommanLayout({ children }: IProps) {
   return (
      <div className="min-h-screen flex flex-col">

         <Naver />
         
   
         <div className="grid-1">
            {children}
      </div>
         <Footer />
      </div>
   );
}

export default CommanLayout;