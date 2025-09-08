import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/featuer/password/Pasword.api";

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
            // toast.error(res?.message || "Failed to reset password");
            navigate("/login");
         }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         console.error("Error resetting password:", err);
         toast.error(err?.data?.message || "Error resetting password");
      }
   };

   return (
      <div className="min-h-screen flex flex-col justify-center items-center">
         <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
         <form onSubmit={handleSubmit} className="space-y-4 w-80">
            <input
               type="password"
               placeholder="Enter new password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               className="w-full px-3 py-2 border rounded-md"
               required
            />
            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-indigo-600 text-white py-2 rounded-md disabled:opacity-50"
            >
               {isLoading ? "Resetting..." : "Reset Password"}
            </button>
         </form>
      </div>
   );
};

export default ResetPassword;
