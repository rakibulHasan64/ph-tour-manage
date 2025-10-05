
import { useSearchParams } from "react-router";
import { useGetDivisionsQuery } from "../../../../redux/featuer/divison/Divison.api";
import { useGetTourTypesQuery } from "../../../../redux/featuer/tour/tour.api";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../ui/select";

export default function TourFilet() {
   const [searchParams, setSearchParams] = useSearchParams();

   const selectedDivision = searchParams.get("division") || undefined;
   const selectedTourType = searchParams.get("tourType") || undefined;

   const { data: divisionData, isLoading: divisionIsLoading } =
      useGetDivisionsQuery(undefined);

   const { data: tourTypeData, isLoading: tourTypeIsLoading } =
      useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

   const divisionOption = divisionData?.map(
      (item: { _id: string; name: string }) => ({
         label: item.name,
         value: item._id,
      })
   );

   const tourTypeOptions = tourTypeData?.data?.map(
      (item: { _id: string; name: string }) => ({
         label: item.name,
         value: item._id,
      })
   );

   const handleDivisionChange = (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("division", value);
      setSearchParams(params);
   };

   const handleTourTypeChange = (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("tourType", value);
      setSearchParams(params);
   };

   const handleClearFilter = () => {
      const params = new URLSearchParams(searchParams); 
      params.delete("division");
      params.delete("tourType");
      setSearchParams(params);
   };

   return (
      <div className="col-span-3 w-full h-[500px] border border-muted text-white rounded-md p-5 space-y-4">
         <div className="flex justify-between items-center">
            <h1>Filters</h1>
            <Button className="text-black" size="sm" variant="outline" onClick={handleClearFilter}>
               Clear Filter
            </Button>
         </div>
         <div>
            <Label className="mb-2">Division to visit</Label>
            <Select
               onValueChange={(value) => handleDivisionChange(value)}
               value={selectedDivision ? selectedDivision : ""}
               disabled={divisionIsLoading}
            >
               <SelectTrigger className="w-full">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Divisions</SelectLabel>
                     {divisionOption?.map((item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                           {item.label}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
         <div>
            <Label className="mb-2">Tour Type</Label>
            <Select
               onValueChange={handleTourTypeChange}
               value={selectedTourType ? selectedTourType : ""}
               disabled={tourTypeIsLoading}
            >
               <SelectTrigger className="w-full">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Divisions</SelectLabel>
                     {tourTypeOptions?.map(
                        (item: { value: string; label: string }) => (
                           <SelectItem key={item.value} value={item.value}>
                              {item.label}
                           </SelectItem>
                        )
                     )}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
      </div>
   );
}