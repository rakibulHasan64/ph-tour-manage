/* eslint-disable no-console */


import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback,  } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.module";
import { IsActive, Role } from "../modules/user/user.interface";
import {Strategy as LocalStrategy} from "passport-local"
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";

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
             return done("User does not exist")
         }

         if (!isUserExist.isVerified) {
       
         done("User is not verified")
        }

         if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            done(`User iS ${isUserExist.isActive}`)
         
         }



       if (isUserExist.isDeleted) {
      
         done("User is deleted")
       }
    
      
      

         const isGoogleAuthenticated = isUserExist.auths.some(providerObjects => providerObjects.provider == "google")
         
         if (isGoogleAuthenticated && !isUserExist.password) {
            return  done("You have authebticed throught google plase want a login then login and password")
         }

         const ispasswordMacth = await bcrypt.compare(password as string, isUserExist.password as string)
         if (!ispasswordMacth) {
            return done(null, false, {message: "Password does not match"})
         
         }
         
         return done(null, isUserExist)
          
         
      } catch (error) {
         console.log(error);
         done(error)
         
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
               return done(null,false,{mesaage: "No email found"})
            }

            let user = await User.findOne({ email })
            
            if (!user) {
               user = await User.create({
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

            return done(null,user)
            
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

