/* eslint-disable no-console */


import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback,  } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.module";
import { IsActive, Role } from "../modules/user/user.interface";
import {Strategy as LocalStrategy} from "passport-local"
import bcrypt from "bcryptjs";

passport.use(
   new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
   }, async (email: string, password: string, done) => { 
      try {
       const isUserExist=await User.findOne({email})
      
         // if (!isUserExist) {
         //     return done(null,false,{message: "User does not exist"})
         // }

         if (!isUserExist) {
            return done(null, false, { message: "User does not exist" });

         }

         if (!isUserExist.isVerified) {
       
            return done(null, false, { message: "User is not verified" });
        }

         if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            return done(null, false, { message: `User is ${isUserExist.isActive}` });
         
         }



       if (isUserExist.isDeleted) {
      
          return done(null, false, { message: "User is deleted" });
       }
    
      
      

         const isGoogleAuthenticated = isUserExist.auths.some(providerObjects => providerObjects.provider == "google")
         
         if (isGoogleAuthenticated && !isUserExist.password) {
            return done(null, false, {
               message: "You signed up with Google, please use Google login.",
            });
         }

         const ispasswordMacth = await bcrypt.compare(password as string, isUserExist.password as string)
         if (!ispasswordMacth) {
            return done(null, false, {message: "Password does not match"})
         
         }
         
         return done(null, isUserExist)
          
         
      } catch (error) {
         console.log(error);
         return done(error);
         
      }

   })
)



passport.use(
   new GoogleStrategy(
      {
         clientID: envVars.GOOGLE_CLIENT_ID,
         clientSecret: envVars.GOOGLE_CLIENT_SECRET,
         callbackURL: envVars.GOOGLE_CALLBACK_URL

      }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => { 
         
         try {

            const email = profile.emails?.[0].value;

            if (!email) {
               return done(null, false, { message: "No email found" });

            }

            let isUserExist = await User.findOne({ email })

           if (isUserExist && !isUserExist.isVerified) {
             return done(null, false, { message: "User is not verified" })
           }

            if (isUserExist && (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE)) {
               return done(null, false, { message: `User is ${isUserExist.isActive}` });
            }

            if (isUserExist && isUserExist.isDeleted) {
               return done(null, false, { message: "User is deleted" })
                    // done("User is deleted")
            }

            
            if (! isUserExist) {
                isUserExist = await User.create({
                  email,
                  name: profile.displayName,
                  picture: profile.photos?.[0].value,
                  role: Role.USER,
                  isVerified: true,
                  auths: [
                     {
                         
                        provider: "google",
                        providerId: profile.id
                     }
                  ]

               })
            }

            return done(null, isUserExist)
            
         } catch (error) {
      
            console.log("google strategy Error", error);
            return done(error)
         }
      }
         
      
   )
)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done(null, (user as any)._id); // user._id MongoDB 
});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
   try {

      const user = await User.findById(id)
      done(null,user)
      
   } catch (error) {
      console.log(error);
      done(error)
      
   }
})

