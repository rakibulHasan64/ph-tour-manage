

import { differenceInDays, format } from "date-fns";

import { Link, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { useGetAllToursQuery} from "../../redux/featuer/tour/tour.api";
import { useGetDivisionsQuery } from "../../redux/featuer/divison/Divison.api";
import { useState } from "react";

export default function TourDetails() {
   const { id } = useParams();
   const { data, isLoading } = useGetAllToursQuery({ _id: id });
   const [activeImage, setActiveImage] = useState(0);

   const { data: divisionData } = useGetDivisionsQuery(
      {
         _id: data?.[0]?.division,
         fields: "name",
      },
      {
         skip: !data,
      }
   );
   
   const tourData = data?.[0];

   if (isLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header with background image */}
         <div
            className="h-96 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${tourData?.images?.[1]})` }}
         >
            <div className="absolute inset-0 bg-black/40  bg-opacity-50"></div>
            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-8">
               <div className="text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{tourData?.title}</h1>
                  <div className="flex flex-wrap gap-4 text-lg">
                     <span className="flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {tourData?.location}
                     </span>
                     <span className="flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        From ${tourData?.costFrom}
                     </span>
                     <span className="flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Max {tourData?.maxGuest} guests
                     </span>
                  </div>
               </div>
            </div>
         </div>

         <div className="container mx-auto md:px-4 py-8">
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Left column - Tour details */}
               <div className="lg:col-span-2">
                  {/* Image gallery */}
                  <div className="mb-8">
                     <div className="md:rounded-xl overflow-hidden mb-4 w-full">
                        <img
                           src={tourData?.images?.[activeImage]}
                           alt={tourData?.title}
                           className="w-full h-96 object-left-bottom"
                        />
                     </div>
                     <div className="grid grid-cols-4 gap-2">
                        {tourData?.images?.map((image, index) => (
                           <div
                              key={index}
                              className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${activeImage === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                              onClick={() => setActiveImage(index)}
                           >
                              <img
                                 src={image}
                                 alt={`${tourData?.title} ${index + 1}`}
                                 className="w-full h-20 object-cover"
                              />
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Tour description */}
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                     <h2 className="text-2xl font-bold mb-4">Tour Description</h2>
                     <p className="text-gray-700 leading-relaxed">{tourData?.description}</p>
                  </div>

                  {/* Tour plan */}
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                     <h2 className="text-2xl font-bold mb-6">Tour Plan</h2>
                     <div className="space-y-6">
                        {tourData?.tourPlan?.map((plan, index) => (
                           <div key={index} className="flex">
                              <div className="flex flex-col items-center mr-4">
                                 <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                    {index + 1}
                                 </div>
                                 {index < (tourData?.tourPlan?.length - 1) && (
                                    <div className="w-1 h-16 bg-blue-200 my-1"></div>
                                 )}
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                                 <p className="text-gray-800">{plan}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right column - Booking and info */}
               <div className="space-y-6">
                  {/* Booking card */}
                  <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
                     <div className="text-center mb-6">
                        <span className="text-3xl font-bold text-blue-600">${tourData?.costFrom}</span>
                        <span className="text-gray-600"> / person</span>
                     </div>

                     <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Dates:</span>
                           <span className="font-medium">
                              <p>
                                 <strong>Dates:</strong>{" "}
                                 {format(
                                    new Date(tourData?.startDate ? tourData?.startDate : new Date()),
                                    "PP"
                                 )}{" "}
                                 -{" "}
                                 {format(
                                    new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                                    "PP"
                                 )}
                              </p>
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Duration:</span>
                           {differenceInDays(
                              new Date(tourData?.endDate || new Date()),
                              new Date(tourData?.startDate || new Date())
                           ) + 1}{" "}
                        </div>
                        
                        <div className="flex justify-between">
                           <span className="text-gray-600">Min Age:</span>
                           <span className="font-medium">{tourData?.minAge} years</span>
                        </div>
                     </div>

                     <Button className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700">
                        <Link to={`/booking/${tourData?._id}`} state={{
                           image: tourData?.images[2],
                           title: tourData?.title,
                           price: tourData?.costFrom
                        }}>Book Now</Link>
                     </Button>
                  </div>

                  {/* Tour info */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                     <h3 className="text-xl font-semibold mb-4">Tour Information</h3>
                     <div className="space-y-3">
                        <div className="flex items-center">
                           <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                           <span><strong>Division:</strong> {divisionData?.[0]?.name}</span>
                        </div>
                        <div className="flex items-center">
                           <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           <span><strong>Departure:</strong> {tourData?.departureLocation}</span>
                        </div>
                        <div className="flex items-center">
                           <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           <span><strong>Arrival:</strong> {tourData?.arrivalLocation}</span>
                        </div>
                     </div>
                  </div>

                  {/* Amenities */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                     <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                     <div className="grid grid-cols-1 gap-2">
                        {tourData?.amenities?.map((amenity, index) => (
                           <div key={index} className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {amenity}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
               <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-green-600">Included</h3>
                  <ul className="space-y-2">
                     {tourData?.included?.map((item, index) => (
                        <li key={index} className="flex items-center">
                           <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                           </svg>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-red-600">Excluded</h3>
                  <ul className="space-y-2">
                     {tourData?.excluded?.map((item, index) => (
                        <li key={index} className="flex items-center">
                           <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
//    _id: "1",
//    title: "Magical Santorini Island Adventure",
//    description:
//      "Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.",
//    location: "Santorini, Greece",
//    images: [
//      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
//      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=300&fit=crop",
//      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
//    ],
//    costFrom: 1299,
//    maxGuest: 12,
//    startDate: "2024-06-15",
//    endDate: "2024-06-20",
//    departureLocation: "Athens International Airport",
//    arrivalLocation: "Santorini Airport",
//    division: "Cyclades",
//    tourType: "Cultural & Leisure",
//    minAge: 18,
//    amenities: [
//      "Free WiFi",
//      "Air Conditioning",
//      "Swimming Pool Access",
//      "24/7 Concierge",
//      "Spa Services",
//    ],
//    included: [
//      "Round-trip flights",
//      "4-star hotel accommodation",
//      "Daily breakfast",
//      "Guided tours",
//      "Wine tasting experience",
//      "Sunset cruise",
//    ],
//    excluded: [
//      "Travel insurance",
//      "Lunch and dinner",
//      "Personal expenses",
//      "Optional activities",
//      "Tips and gratuities",
//    ],
//    tourPlan: [
//      "Arrival in Santorini and check-in to hotel",
//      "Explore Fira town and enjoy welcome dinner",
//      "Visit Oia village and watch famous sunset",
//      "Wine tasting tour in traditional vineyards",
//      "Relax at Red Beach and visit Akrotiri ruins",
//      "Sunset sailing cruise and departure",
//    ],
//    slug: "magical-santorini-island-adventure",
//    createdAt: "2024-01-15T10:30:00.000Z",
//    updatedAt: "2024-02-10T14:45:00.000Z",
//  };