import { RingLoader } from "react-spinners";

function Loading() {
   return (
      <div className="flex items-center justify-center h-screen bg-black">
         <RingLoader color="#06b6d4" size={80} />
      </div>
   );
}

export default Loading;
