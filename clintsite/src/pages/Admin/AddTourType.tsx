
import { Trash2 } from "lucide-react";
import {  useGetTourTypesQuery, useRemoveTourTypeMutation } from "../../redux/featuer/tour/tour.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { AddTourTypeModal } from "../../components/modules/Adminmodules/tourtype/AddTourTypeModal";
import { DeleteConfarmation } from "../../components/ui/DeleteConfarmation";
import { toast } from "sonner";

export default function AddTourType() {
   const { data } = useGetTourTypesQuery(undefined);
   const [removeTourType] = useRemoveTourTypeMutation()

   const handleConfaramRemove = async (tourId: string) => {
      const tostId=toast.loading("Removing....")

      try {
         const res = await removeTourType(tourId).unwrap()
         if (res.success) {
            toast.success("Tour Remove",{id: tostId})
         }
         
      } catch (error) {
         console.log(error);
         
      }
      const res = await removeTourType(tourId).unwrap()
      if (res.success) {
         toast.success("Tour Remove")
      }
   }

   
   

   return (
      <div className="w-full max-w-7xl mx-auto px-5">
         <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">Tour Types</h1>
            <AddTourTypeModal />
         </div>
         <div className="border border-muted rounded-md">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[100px]">Name</TableHead>
                     <TableHead className="text-right">Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data?.map((item: {_id: string, name: string }) => (
                     <TableRow>
                        <TableCell className="font-medium w-full">
                           {item?.name}
                        </TableCell>
                        <TableCell>

                           <DeleteConfarmation onConfirm={() => handleConfaramRemove(item._id)}>

                              <Button size="sm">
                                 <Trash2 />
                              </Button>
                           </DeleteConfarmation>
                           
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}