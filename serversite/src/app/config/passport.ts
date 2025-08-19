/* eslint-disable no-console */


import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback,  } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.module";
import { Role } from "../modules/user/user.interface";





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



passport.deserializeUser(async (id: string, done: any) => {
   try {

      const user = await User.findById(id)
      done(null,user)
      
   } catch (error) {
      console.log(error);
      done(error)
      
   }
})