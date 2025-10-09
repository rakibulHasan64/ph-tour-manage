import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../redux/featuer/password/Pasword.api";
import { Lock, Shield, Eye, EyeOff, Key } from "lucide-react";

const ChangePassword: React.FC = () => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [showOldPassword, setShowOldPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [changePassword, { isLoading }] = useChangePasswordMutation();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!oldPassword || !newPassword) {
         return toast.error("Both old and new password are required!");
      }

      try {
         const res = await changePassword({ oldPassword, newPassword }).unwrap();
         console.log("Change Password Response:", res);

         if (res?.success) {
            toast.success(res.message || "Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
         } else {
            toast.error(res?.message || "Failed to change password");
         }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         console.error(err);
         toast.error(err?.data?.message || "Error changing password");
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 px-4 relative overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

            {/* Floating Security Icons */}
            {[...Array(4)].map((_, index) => (
               <div
                  key={index}
                  className="absolute text-white/10 animate-float"
                  style={{
                     top: `${20 + index * 20}%`,
                     left: `${10 + index * 25}%`,
                     animationDelay: `${index * 2}s`,
                     animationDuration: `${20 + index * 5}s`
                  }}
               >
                  <Shield className="w-8 h-8" />
               </div>
            ))}

            {/* Floating Particles */}
            {[...Array(6)].map((_, index) => (
               <div
                  key={index}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                  style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 5}s`,
                     animationDuration: `${15 + Math.random() * 10}s`
                  }}
               ></div>
            ))}
         </div>

         {/* Main Card */}
         <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
               {/* Header */}
               <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 text-center border-b border-white/10">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                     <Key className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-black text-white mb-2">
                     Change Password
                  </h1>
                  <p className="text-cyan-100 font-medium">
                     Secure your account with a new password
                  </p>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Old Password Field */}
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        Current Password
                     </label>
                     <div className="relative">
                        <input
                           type={showOldPassword ? "text" : "password"}
                           placeholder="Enter your current password"
                           value={oldPassword}
                           onChange={(e) => setOldPassword(e.target.value)}
                           className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 pr-12"
                           required
                        />
                        <button
                           type="button"
                           onClick={() => setShowOldPassword(!showOldPassword)}
                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                           {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>

                  {/* New Password Field */}
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        New Password
                     </label>
                     <div className="relative">
                        <input
                           type={showNewPassword ? "text" : "password"}
                           placeholder="Enter your new password"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 pr-12"
                           required
                        />
                        <button
                           type="button"
                           onClick={() => setShowNewPassword(!showNewPassword)}
                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                           {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>

                  {/* Security Tips */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                     <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        Security Tips:
                     </h3>
                     <ul className="text-white/70 text-xs space-y-1">
                        <li className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                           Use a strong, unique password
                        </li>
                        <li className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                           Include numbers and special characters
                        </li>
                        <li className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                           Avoid using personal information
                        </li>
                     </ul>
                  </div>

                  {/* Submit Button */}
                  <button
                     type="submit"
                     disabled={isLoading || !oldPassword || !newPassword}
                     className="w-full group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                     {isLoading ? (
                        <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           Changing Password...
                        </>
                     ) : (
                        <>
                           <Shield className="w-5 h-5" />
                           <span>Update Password</span>
                        </>
                     )}
                  </button>
               </form>

               {/* Footer */}
               <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
                  <p className="text-white/60 text-sm">
                     Make sure to remember your new password
                  </p>
               </div>
            </div>
         </div>

         {/* Custom CSS for animations */}
         <style>{`
            @keyframes float {
               0%, 100% { 
                  transform: translateY(0px) translateX(0px) rotate(0deg);
               }
               33% { 
                  transform: translateY(-20px) translateX(10px) rotate(120deg);
               }
               66% { 
                  transform: translateY(-10px) translateX(-5px) rotate(240deg);
               }
            }
            .animate-float {
               animation: float 20s ease-in-out infinite;
            }
         `}</style>
      </div>
   );
};

export default ChangePassword;