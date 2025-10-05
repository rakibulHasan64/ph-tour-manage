import { useNavigate } from "react-router";
import { useUserInfoQuery } from "../../redux/featuer/auth/auth.api";
import { useSetPasswordMutation } from "../../redux/featuer/password/Pasword.api";
import { useState } from "react";

function SetPassword() {
   const { data: user } = useUserInfoQuery(undefined);
   const [setPassword, { isLoading }] = useSetPasswordMutation();
   const navget=useNavigate()

   // Local state
   const [password, setPasswordValue] = useState("");
   const [showSuccess, setShowSuccess] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!password) return alert("Please enter a password");

      try {
         await setPassword({ password }).unwrap();
         setPasswordValue(""); // Clear input
         setShowSuccess(true);
         // Hide success message after 3 seconds
         setTimeout(() => setShowSuccess(false), 3000);
         navget("/login")
      } catch (err) {
         console.error("Failed to set password:", err);
      }
   };

   return (
      <>
         
         <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg mt-80">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
               🔒 Set Password
            </h2>
            <p className="text-center text-gray-500 mb-8">
               User: <span className="font-medium text-gray-700">{user?.name}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                  <input
                     type="password"
                     placeholder="Enter new password"
                     value={password}
                     onChange={(e) => setPasswordValue(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  {isLoading ? (
                     <span className="flex items-center justify-center">
                        <svg
                           className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                        >
                           <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                           ></circle>
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                     5.291A7.962 7.962 0 014 12H0c0 3.042 
                     1.135 5.824 3 7.938l3-2.647z"
                           ></path>
                        </svg>
                        Setting...
                     </span>
                  ) : (
                     "Set Password"
                  )}
               </button>
            </form>

            {showSuccess && (
               <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 shadow-sm text-center">
                  ✅ Password updated successfully!
               </div>
            )}

            {/* {error && (
               <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 shadow-sm text-center">
                  ❌ Error updating password
               </div>
            )} */}
         </div>
      </>
   );
}

export default SetPassword;
