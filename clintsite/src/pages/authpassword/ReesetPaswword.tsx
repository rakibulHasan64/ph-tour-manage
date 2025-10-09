import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/featuer/password/Pasword.api";
import { Lock, Shield } from "lucide-react";

const ResetPassword: React.FC = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const queryParams = new URLSearchParams(location.search);
   const userId = queryParams.get("id") || "";
   const token = queryParams.get("token") || "";

   const [newPassword, setNewPassword] = useState("");
   const [resetPassword, { isLoading }] = useResetPasswordMutation();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPassword) return toast.error("Password is required!");

      try {
         const res = await resetPassword({ id: userId, token, newPassword }).unwrap();
         console.log("Reset Password Response:", res);

         if (res?.success) {
            toast.success(res.message || "Password reset successful!");
            navigate("/login");
         } else {
            navigate("/login");
         }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         console.error("Error resetting password:", err);
         toast.error(err?.data?.message || "Error resetting password");
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 px-4">
         {/* Background Elements */}
         <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
         </div>

         {/* Main Card */}
         <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
               {/* Header */}
               <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 text-center border-b border-white/10">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                     Reset Password
                  </h1>
                  <p className="text-cyan-100 text-sm">
                     Enter your new password below
                  </p>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-6">
                     {/* Password Field */}
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-white font-medium text-sm">
                           <Lock className="w-4 h-4 text-cyan-400" />
                           New Password
                        </label>
                        <input
                           type="password"
                           placeholder="Enter new password"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                           required
                        />
                     </div>

                     {/* Submit Button */}
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                     >
                        {isLoading ? "Resetting..." : "Reset Password"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;