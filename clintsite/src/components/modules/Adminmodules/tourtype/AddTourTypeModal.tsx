

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddTourTypeMutation } from "../../../../redux/featuer/tour/tour.api";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Input } from "../../../ui/input";

export function AddTourTypeModal() {
   const form = useForm();
   const [addTourType] = useAddTourTypeMutation();

   const onSubmit = async (data) => {
      const res = await addTourType({ name: data.name }).unwrap();
      if (res.success) {
         toast.success("Tour Type Added");
      }
   };

   return (
      <Dialog>
         <form>
            <DialogTrigger asChild>
               <Button>Add Tour Type</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Add Tour Type</DialogTitle>
               </DialogHeader>
               <Form {...form}>
                  <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tour Type Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Tour Type Name"
                                    {...field}
                                    value={field.value || ""}
                                 />
                              </FormControl>
                              <FormMessage/>
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>

               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" form="add-tour-type">
                     Save changes
                  </Button>
               </DialogFooter>
            </DialogContent>
         </form>
      </Dialog>
   );
}