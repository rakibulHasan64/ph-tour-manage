/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IAuthProvider, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.module";
import bcryptjs from 'bcryptjs'

export const seedSuPerAdmin = async () => {
   try {
      const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })
      
      if (isSuperAdminExist) {
         console.log("super admin alredy exisit")
         return
         
      }

      const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))
      
      const authProvider: IAuthProvider = {
         provider: "credentials",
         providerId: envVars.SUPER_ADMIN_EMAIL
      }

      const payload = {
         name: "SUPER_ADMIN",
         role: Role.SUPER_ADMIN,
         email: envVars.SUPER_ADMIN_EMAIL,
         password: hashedPassword,
         isVerified: true,
         auths: [authProvider]
      }

      const superAdmin = await User.create(payload)
      
      console.log(superAdmin);
      console.log("Super Admin Email:", envVars.SUPER_ADMIN_EMAIL);
console.log("Super Admin Password:", envVars.SUPER_ADMIN_PASSWORD);

      
      
   } catch (error) {
      console.log(error);
      
      
   }
}