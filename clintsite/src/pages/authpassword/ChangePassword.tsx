import { useState } from "react";

import { toast } from "sonner";
import { useChangePasswordMutation } from "../../redux/featuer/password/Pasword.api";

const ChangePassword: React.FC = () => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
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
      <div className="min-h-screen flex flex-col justify-center items-center">
         <h2 className="text-2xl font-bold mb-4">Change Password</h2>
         <form onSubmit={handleSubmit} className="space-y-4 w-80">
            <input
               type="password"
               placeholder="Old Password"
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               className="w-full px-3 py-2 border rounded-md"
               required
            />
            <input
               type="password"
               placeholder="New Password"
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
               {isLoading ? "Changing..." : "Change Password"}
            </button>
         </form>
      </div>
   );
};

export default ChangePassword;
