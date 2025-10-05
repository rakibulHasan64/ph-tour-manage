import {  Link, useNavigate } from "react-router";
import { Button } from "../../../lib/button";
import { cn } from "../../../lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../../redux/featuer/auth/auth.api";
import config from "../../../config";


interface IErrorResponse {
   data: {
      message: string;
   };
}


function LoginFrom({
   className,
   ...props }: React.HTMLAttributes<HTMLDivElement>) {
   
   const navigate = useNavigate();
   const form = useForm();
   const [login] = useLoginMutation();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      try {
         const res = await login(data).unwrap();

         if (res.success) {
            toast.success("Logged in successfully");
            navigate("/");
         }
      } catch (err: unknown ) {
         console.error(err);
         const error = err as IErrorResponse;

         if (error.data.message === "Password does not match") {
            toast.error("Invalid credentials");
         }

         if (error.data.message === "User is not verified") {
            toast.error("Your account is not verified");
            navigate("/verify", { state: data.email });
         }
      }
   };

        
   
   return (
      <>
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
               <h1 className="text-2xl font-bold">Login to your account</h1>
               <p className="text-balance text-sm text-muted-foreground">
                  Enter your email below to login to your account
               </p>
            </div>
            <div className="grid gap-6">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="john@example.com"
                                    {...field}
                                    value={field.value || ""}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                    value={field.value || ""}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type="submit" className="w-full">
                        Login
                     </Button>
                  </form>
               </Form>

               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                     Or continue with <Link to={"/Forgot-Password"} className="text-red-400">FogetPassword</Link>
                  </span>
               </div>

               <Button
               
                  onClick={()=> window.open(`${config.baseUrl}/auth/google`)}
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
               >
                  Login with Google
               </Button>
            </div>
            <div className="text-center text-sm">
               Don&apos;t have an account?{" "}
               <Link to="/register" replace className="underline underline-offset-4">
                  Register
               </Link>
            </div>
         </div>
         
      </>
   );
}

export default LoginFrom;