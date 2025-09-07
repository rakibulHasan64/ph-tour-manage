

import { Link, useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { useGetAllToursQuery } from "../../redux/featuer/tour/tour.api";
import TourFilet from "../../components/modules/Adminmodules/tour/TourFilet";



export default function Tours() {
   const [searchParams] = useSearchParams();



   const division = searchParams.get("division") || undefined;
   const tourType = searchParams.get("tourType") || undefined;

   const { data,isLoading,isError } = useGetAllToursQuery({ division, tourType });
   

   

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Error!</p>;


      
   return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-6 gap-6">
         
          <div className="md:col-span-2 hidden md:block">
      <TourFilet />
        </div> 

      
         <div className="md:col-span-6 lg:col-span-4 w-full">
            {data?.map((item) => (
               <div
                  key={item.slug}
                  className="border border-muted rounded-2xl shadow-md overflow-hidden mb-6 flex flex-col md:flex-row"
               >
                  {/* Image */}
                  <div className="w-full md:w-2/5 bg-red-500 flex-shrink-0">
                     <img
                        src={item.images[0]}
                        alt={item.title}
                        className="object-cover w-full h-48 md:h-full"
                     />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                     <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-3">
                        {item.description}
                     </p>

                     <div className="flex items-center justify-between mb-3 text-sm md:text-base">
                        <span className="font-bold text-primary">
                           From ৳{item?.costFrom?.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">Max {item.maxGuest} guests</span>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                        <div>
                           <span className="font-medium">From:</span> {item.departureLocation}
                        </div>
                        <div>
                           <span className="font-medium">To:</span> {item.arrivalLocation}
                        </div>
                        <div>
                           <span className="font-medium">Duration:</span> {item.tourPlan.length} days
                        </div>
                        <div>
                           <span className="font-medium">Min Age:</span> {item.minAge}+
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-2 mb-4">
                        {item?.amenities?.slice(0, 3)?.map((amenity, index) => (
                           <span
                              key={index}
                              className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                           >
                              {amenity}
                           </span>
                        ))}
                        {item.amenities.length > 3 && (
                           <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                              +{item.amenities.length - 3} more
                           </span>
                        )}
                     </div>

                     <Button asChild className="w-full mt-auto">
                        <Link to={`/tours/${item._id}`}>View Details</Link>
                     </Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );

}