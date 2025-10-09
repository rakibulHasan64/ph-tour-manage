import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetAllToursQuery } from "../../redux/featuer/tour/tour.api";
import { useCreatBookingMutation } from "../../redux/featuer/booking/booking.api";
import { Button } from "../../components/ui/button";
import { format, differenceInDays } from "date-fns";
import Loading from "../../components/layout/Loding";
import {
   MapPin,
   Clock,
   Users,
   Calendar,
   Star,
   Shield,
   Check,
   ArrowRight,
   Plus,
   Minus,
   Lock,
   Heart,
   Share2
} from "lucide-react";

export default function BookingPage() {
   const [guestCount, setGuestCount] = useState(1);
   const [totalAmount, setTotalAmount] = useState(0);
   const [isFavorite, setIsFavorite] = useState(false);
   const { id } = useParams();
   const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
   const [createBooking] = useCreatBookingMutation();


   const tourData = data?.[0];

   console.log("sgwqrgqwrt", tourData);

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
            guestCount: Number(guestCount),
         };
      }

      try {
         const res = await createBooking(bookingData).unwrap();

         console.log("bookinge data ios ", res);

         if (res.success) {
            window.open(res?.data?.paymentUrl);
         }
      } catch (err) {
         console.log(err);
      }
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
         <div className="container mx-auto px-4">
            {!isLoading && isError && (
               <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <div className="text-2xl">⚠️</div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Something Went Wrong!</h2>
                  <p className="text-red-200">Please try again later.</p>
               </div>
            )}

            {!isLoading && data?.length === 0 && (
               <div className="bg-yellow-500/20 backdrop-blur-lg border border-yellow-500/30 rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <div className="text-2xl">🔍</div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">No Tour Found</h2>
                  <p className="text-yellow-200">The tour you're looking for doesn't exist.</p>
               </div>
            )}

            {!isLoading && !isError && data!.length > 0 && (
               <div className="flex flex-col xl:flex-row gap-8">
                  {/* Left Section - Tour Details */}
                  <div className="flex-1 space-y-8">
                     {/* Tour Header */}
                     <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                        <div className="flex justify-between items-start mb-6">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                              <h1 className="text-3xl md:text-4xl font-black text-white">{tourData?.title}</h1>
                           </div>
                           <div className="flex items-center gap-2">
                              <button
                                 onClick={() => setIsFavorite(!isFavorite)}
                                 className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${isFavorite
                                       ? 'bg-red-500/20 text-red-400 shadow-lg'
                                       : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                              >
                                 <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`} />
                              </button>
                              <button className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                                 <Share2 className="w-5 h-5" />
                              </button>
                           </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">{tourData?.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50 group hover:scale-105 transition-transform duration-300">
                              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <MapPin className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400">Location</p>
                                 <p className="font-semibold text-white text-lg">{tourData?.location}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50 group hover:scale-105 transition-transform duration-300">
                              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <Clock className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400">Duration</p>
                                 <p className="font-semibold text-white text-lg">
                                    {differenceInDays(
                                       new Date(tourData?.endDate || new Date()),
                                       new Date(tourData?.startDate || new Date())
                                    ) + 1} days
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50 group hover:scale-105 transition-transform duration-300">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <Calendar className="w-6 h-6 text-purple-400" />
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400">Dates</p>
                                 <p className="font-semibold text-white text-sm">
                                    {format(new Date(tourData?.startDate || new Date()), "MMM dd")} -{" "}
                                    {format(new Date(tourData?.endDate || new Date()), "MMM dd, yyyy")}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50 group hover:scale-105 transition-transform duration-300">
                              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <Users className="w-6 h-6 text-orange-400" />
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400">Max Guests</p>
                                 <p className="font-semibold text-white text-lg">{tourData?.maxGuest}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Tour Image */}
                     <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
                        <img
                           src={tourData?.images[1]}
                           alt={tourData?.title}
                           className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                     </div>

                  
                  </div>

                  {/* Right Section - Booking Card */}
                  <div className="w-full xl:w-96">
                     <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50 sticky top-8">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
                           Complete Booking
                        </h2>
                        <p className="text-gray-400 text-center mb-8">Secure your spot now</p>

                        <div className="space-y-6">
                           {/* Guest Counter */}
                           <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600/50">
                              <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                 <Users className="w-5 h-5 text-purple-400" />
                                 Number of Guests
                              </label>
                              <div className="flex items-center justify-between">
                                 <button
                                    onClick={decrementGuest}
                                    disabled={guestCount <= 1}
                                    className="w-12 h-12 rounded-2xl bg-gray-600 border border-gray-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-500 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                                 >
                                    <Minus className="w-5 h-5" />
                                 </button>

                                 <div className="text-center">
                                    <span className="text-4xl font-black text-white block">{guestCount}</span>
                                    <span className="text-sm text-gray-400">Guests</span>
                                 </div>

                                 <button
                                    onClick={incrementGuest}
                                    disabled={guestCount >= tourData!.maxGuest}
                                    className="w-12 h-12 rounded-2xl bg-gray-600 border border-gray-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-500 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                                 >
                                    <Plus className="w-5 h-5" />
                                 </button>
                              </div>
                              <p className="text-sm text-gray-400 text-center mt-3">
                                 Maximum {tourData?.maxGuest} guests allowed
                              </p>
                           </div>

                           {/* Price Breakdown */}
                           <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30">
                              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                                 <Star className="w-5 h-5 text-yellow-400" />
                                 Price Summary
                              </h3>

                              <div className="space-y-4">
                                 <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Price per person</span>
                                    <span className="font-semibold text-white">${tourData?.costFrom}</span>
                                 </div>

                                 <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Number of guests</span>
                                    <span className="font-semibold text-white">{guestCount}</span>
                                 </div>

                                 <div className="border-t border-blue-400/30 pt-4 mt-2">
                                    <div className="flex justify-between items-center">
                                       <span className="text-xl font-bold text-white">Total Amount</span>
                                       <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                          ${totalAmount}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Book Button */}
                           <Button
                              onClick={handleBooking}
                              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 relative overflow-hidden group"
                           >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                              <div className="flex items-center justify-center gap-3 relative z-10">
                                 <Lock className="w-5 h-5" />
                                 Confirm & Pay Now
                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                           </Button>

                           {/* Security Note */}
                           <div className="text-center space-y-3">
                              <div className="flex items-center justify-center gap-2 text-green-400">
                                 <Shield className="w-4 h-4" />
                                 <p className="text-sm font-medium">SSL Secure Payment</p>
                              </div>
                              <p className="text-xs text-gray-400">
                                 🔒 Your payment is securely encrypted ·
                                 <span className="text-green-400 ml-1">Free cancellation within 24 hours</span>
                              </p>
                           </div>

                           {/* Features */}
                           <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700/50">
                              <div className="text-center p-3 bg-gray-700/30 rounded-xl">
                                 <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <Check className="w-4 h-4 text-green-400" />
                                 </div>
                                 <p className="text-xs text-gray-300">Instant Confirmation</p>
                              </div>
                              <div className="text-center p-3 bg-gray-700/30 rounded-xl">
                                 <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                 </div>
                                 <p className="text-xs text-gray-300">Flexible Dates</p>
                              </div>
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