import { useState, useEffect, type FormEvent } from "react";
import { useUserInfoQuery } from "../../redux/featuer/auth/auth.api";
import { useForgotPasswordMutation } from "../../redux/featuer/password/Pasword.api";



const ForgetPassword: React.FC = () => {
   const [email, setEmail] = useState<string>("");
   const { data: user } = useUserInfoQuery(undefined);
   const [forgotPassword, { data: forgotResponse, isLoading, error }] = useForgotPasswordMutation();

   // Pre-fill email if user data is available
   useEffect(() => {
      if (user?.data?.email) {
         setEmail(user.data.email);
      }
   }, [user]);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email) {
         console.error("Email is required!");
         return;
      }

      try {
         const res = await forgotPassword({ email }).unwrap();
         console.log("Reset password response:", res);
      } catch (err) {
         console.error("Error sending reset link:", err);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
               Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
               Enter your email address and we'll send you a link to reset your password
            </p>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                     </label>
                     <div className="mt-1">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           placeholder="Enter your email address"
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                     </button>
                  </div>
               </form>

               {error && (
                  <div className="mt-4 rounded-md bg-red-50 p-4">
                     <p className="text-red-700">Failed to send reset link. Please try again.</p>
                  </div>
               )}

               {forgotResponse && (
                  <div className="mt-4 rounded-md bg-green-50 p-4">
                     <p className="text-green-700">Check your email for the reset link!</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ForgetPassword;
