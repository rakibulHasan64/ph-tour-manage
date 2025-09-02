import { Link } from "react-router";
import Logo from "../assets/icon/Logo";
import LoginFrom from "../components/modules/Authentication/LoginFrom";


function Login() {
   return (
      <div>
         <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
               <div className="flex justify-center gap-2 md:justify-start">
                  <Link to="/" className="flex items-center gap-2 font-medium">
                     <Logo />
                  </Link>
               </div>
               <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-xs">
                     <LoginFrom />
                  </div>
               </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
               <img
                  src="https://freedesignfile.com/upload/2021/06/Travel-website-login-page-design-vector.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
               />
            </div>
         </div>
         
      </div>
   );
}

export default Login;