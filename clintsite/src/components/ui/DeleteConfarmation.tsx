import type { ReactNode } from "react"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "./alert-dialog"


interface IProps{
   children: ReactNode;
   onConfirm: () => void;
}

export function DeleteConfarmation({ children, onConfirm }: IProps) {

   const handleConfaram = () => {
      onConfirm();
      console.log("confaram click ");
         

   }
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
         {children}
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleConfaram}>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
