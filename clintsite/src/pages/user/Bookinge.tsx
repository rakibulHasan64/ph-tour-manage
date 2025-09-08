import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetAllToursQuery } from "../../redux/featuer/tour/tour.api";
import { useCreatBookingMutation } from "../../redux/featuer/booking/booking.api";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";

export default function BookingPage() {
   const [guestCount, setGuestCount] = useState(1);
   const [totalAmount, setTotalAmount] = useState(0);
   const { id } = useParams();
   const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
   const [createBooking] = useCreatBookingMutation();
   

   const tourData = data?.[0];

   useEffect(() => {
      if (!isLoading && !isError && tourData) {
         setTotalAmount(guestCount * tourData.costFrom);
      }
   }, [guestCount, isLoading, isError, tourData]);

   const incrementGuest = () => {
      if (guestCount < tourData!.maxGuest) {
         setGuestCount((prev) => prev + 1);
      }
   };

   const decrementGuest = () => {
      if (guestCount > 1) {
         setGuestCount((prev) => prev - 1);
      }
   };

   const handleBooking = async () => {
      let bookingData;

      if (data) {
         bookingData = {
            tour: id,
            guestCount: guestCount,
         };
      }

      try {
         const res = await createBooking(bookingData).unwrap();
         if (res.success) {
            window.open(res.data.paymentUrl);
         }
      } catch (err) {
         console.log(err);
      }
   };

   if (isLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 py-8">
         <div className="container mx-auto px-4">
            {!isLoading && isError && (
               <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold text-red-800 mb-2">Something Went Wrong!</h2>
                  <p className="text-red-600">Please try again later.</p>
               </div>
            )}

            {!isLoading && data?.length === 0 && (
               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Tour Found</h2>
                  <p className="text-yellow-600">The tour you're looking for doesn't exist.</p>
               </div>
            )}

            {!isLoading && !isError && data!.length > 0 && (
               <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Section - Tour Details */}
                  <div className="flex-1 space-y-8">
                     {/* Tour Header */}
                     <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{tourData?.title}</h1>
                        <p className="text-gray-600 mb-6">{tourData?.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-500">Location</p>
                                 <p className="font-medium">{tourData?.location}</p>
                              </div>
                           </div>

                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                 </svg>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-500">Duration</p>
                                 <p className="font-medium"><p>
                                    <strong>Dates:</strong>{" "}
                                    {format(
                                       new Date(
                                          tourData?.startDate ? tourData?.startDate : new Date()
                                       ),
                                       "PP"
                                    )}{" "}
                                    -{" "}
                                    {format(
                                       new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                                       "PP"
                                    )}
                                 </p></p>
                              </div>
                           </div>

                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                 </svg>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-500">Tour Type</p>
                                 <p className="font-medium">{tourData?.tourType}</p>
                              </div>
                           </div>

                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                 <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                 </svg>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-500">Max Guests</p>
                                 <p className="font-medium">{tourData?.maxGuest}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Tour Image */}
                     <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        <img
                           src={tourData?.images[1]}
                           alt={tourData?.title}
                           className="w-full h-80 object-cover"
                        />
                     </div>

                     {/* What's Included */}
                     <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                           <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                           What's Included
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {tourData?.included.map((item, index) => (
                              <div key={index} className="flex items-start">
                                 <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                 </svg>
                                 <span className="text-gray-700">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Tour Plan */}
                     <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                           <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                           Tour Plan
                        </h2>
                        <div className="space-y-4">
                           {tourData?.tourPlan?.slice(0,3).map((plan, index) => (
                              <div key={index} className="flex">
                                 <div className="flex flex-col items-center mr-4">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                       {index + 1}
                                    </div>
                                    {index < tourData.tourPlan.length - 1 && (
                                       <div className="w-1 h-12 bg-blue-200 my-1"></div>
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

                  {/* Right Section - Booking Card */}
                  <div className="w-full lg:w-96">
                     <div className="bg-white rounded-2xl p-6 shadow-lg to border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Your Booking</h2>

                        <div className="space-y-6">
                           {/* Guest Counter */}
                           <div className="bg-gray-50 p-4 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Guests</label>
                              <div className="flex items-center justify-between">
                                 <button
                                    onClick={decrementGuest}
                                    disabled={guestCount <= 1}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-sm"
                                 >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                    </svg>
                                 </button>

                                 <span className="text-2xl font-bold text-gray-800 px-4 py-2 bg-white rounded-lg border border-gray-200 min-w-[60px] text-center">
                                    {guestCount}
                                 </span>

                                 <button
                                    onClick={incrementGuest}
                                    disabled={guestCount >= tourData!.maxGuest}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors shadow-sm"
                                 >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                 </button>
                              </div>
                              <p className="text-xs text-gray-500 text-center mt-3">Maximum {tourData?.maxGuest} guests</p>
                           </div>

                           {/* Price Breakdown */}
                           <div className="bg-blue-50 p-5 rounded-xl">
                              <h3 className="font-semibold text-gray-700 mb-4">Price Summary</h3>

                              <div className="space-y-3">
                                 <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price per person</span>
                                    <span className="font-medium">${tourData?.costFrom}</span>
                                 </div>

                                 <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Number of guests</span>
                                    <span className="font-medium">{guestCount}</span>
                                 </div>

                                 <div className="border-t border-gray-200 pt-3 mt-1">
                                    <div className="flex justify-between items-center">
                                       <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                                       <span className="text-2xl font-bold text-blue-600">${totalAmount}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Book Button */}
                           <Button
                              onClick={handleBooking}
                              className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                              size="lg"
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Confirm Booking
                           </Button>

                           {/* Security Note */}
                           <div className="text-center">
                              <p className="text-xs text-gray-500 flex items-center justify-center">
                                 <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                 </svg>
                                 Secure payment · Free cancellation within 24 hours
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
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