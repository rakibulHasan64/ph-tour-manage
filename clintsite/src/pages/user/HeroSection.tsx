
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { useGetDivisionsQuery } from "../../redux/featuer/divison/Divison.api";
import Aos from "aos";

export default function HeroSection() {
   const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
      undefined
   );

   useEffect(() => {
         Aos.init({
            duration: 1000,
            once: true,
         });
      }, []);

   const { data: divisionData,} =
      useGetDivisionsQuery(undefined);

   const divisionOption = divisionData?.map(
      (item: { _id: string; name: string }) => ({
         label: item.name,
         value: item._id,
      })
   );

   return (
      <section
         className=" overflow-hidden  bg-cover bg-center h-screen"
         style={{
            backgroundImage: "url('/pexels-asadphoto-1450340 (1).jpg')",
            opacity: 0.9,
            objectFit: "cover"
         }}
      >
   

         {/* Foreground content */}
         <div className="relative z-10 container mx-auto mt-44 mb-44">
         
            <div className="mx-auto flex max-w-5xl flex-col items-center" >
               <div data-aos="fade-up" className="flex flex-col items-center gap-6 text-center">
                  
                  <div >
                     <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-8xl">
                        Explore the beauty of{" "}
                        <span className="text-primary">Bangladesh</span>
                     </h1>
                     <p className="mx-auto max-w-3xl text-white lg:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                        doloremque mollitia fugiat omnis! Porro facilis quo animi
                        consequatur. Explicabo.
                     </p>
                  </div>
                  <div className="mt-6 flex flex-col md:flex-row justify-center gap-7 space-y-3 md:space-y-0 z-50 ">
                     <Select onValueChange={(value) => setSelectedDivision(value)}>
                        <SelectTrigger className="w-[300px]">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Divisions</SelectLabel>
                              {divisionOption?.map(
                                 (item: { value: string; label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>
                                       {item.label}
                                    </SelectItem>
                                 )
                              )}
                           </SelectGroup>
                        </SelectContent>
                     </Select>

                     {selectedDivision ? (
                        <Button className="bg-red-600 hover:bg-red-700  z-50" asChild>
                           <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                        </Button>
                     ) : (
                        <Button className="bg-red-400 text-gray-200 z-50" disabled>
                           Search
                        </Button>
                     )}
                  </div>


               </div>
            </div>
         </div>
      </section>


   );
}