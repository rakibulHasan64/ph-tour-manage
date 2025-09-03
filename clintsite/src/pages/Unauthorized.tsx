
import { Link } from "react-router";
import { XCircle } from "lucide-react";

function Unauthorized() {
   return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
         <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <XCircle className="mx-auto mb-4 text-red-500 w-16 h-16" />
            <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
            <p className="text-gray-600 mb-6">
               You do not have permission to access this page.
            </p>
            <Link
               to="/"
               className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
               Go to Home
            </Link>
         </div>
      </div>
   );
}

export default Unauthorized;
