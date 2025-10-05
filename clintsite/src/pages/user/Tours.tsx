import { Link, useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { useGetAllToursQuery } from "../../redux/featuer/tour/tour.api";
import TourFilet from "../../components/modules/Adminmodules/tour/TourFilet";
import { useState } from "react";
import Loading from "../../components/layout/Loding";
import {
   MapPin,
   Clock,
   Users,
   Calendar,
   Star,
   ArrowRight,
   Filter,
   Heart,
   Share2,
   Navigation,
   Shield,
   CheckCircle
} from "lucide-react";

export default function Tours() {
   const [searchParams] = useSearchParams();
   const [open, setOpen] = useState(false);
   const [favorites, setFavorites] = useState<Set<string>>(new Set());

   const division = searchParams.get("division") || undefined;
   const tourType = searchParams.get("tourType") || undefined;

   const { data, isLoading, isError } = useGetAllToursQuery({ division, tourType });

   const toggleFavorite = (id: string) => {
      setFavorites(prev => {
         const newFavorites = new Set(prev);
         if (newFavorites.has(id)) {
            newFavorites.delete(id);
         } else {
            newFavorites.add(id);
         }
         return newFavorites;
      });
   };

   if (isLoading) return <Loading />;
   if (isError) return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
         <div className="text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
               <div className="text-2xl">⚠️</div>
            </div>
            <h3 className="text-xl font-bold mb-2">Connection Error</h3>
            <p className="text-gray-300">Failed to load tours. Please check your connection.</p>
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
         {/* Hero Section with Glass Effect */}
         <div className="relative h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10" />
            <img
               className="w-full h-full object-cover transform scale-105"
               src="/b.png"
               alt="Adventure Awaits"
            />
            <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
               <div className="text-center text-white">
                  <h1 className="text-2xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                     EXPLORE BANGLADESH
                  </h1>
                  <p className="text-xl opacity-90 font-light tracking-wider">
                     Discover Hidden Gems • Create Memories • Live Adventures
                  </p>
               </div>
            </div>
         </div>

         {/* Floating Stats Bar */}
         <div className="container mx-auto px-4 -mt-8 relative z-30">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
               <div className="flex flex-wrap justify-between items-center text-white">
                  <div className="text-center px-4">
                     <div className="text-3xl font-bold">{data?.length || 0}+</div>
                     <div className="text-sm opacity-80">Premium Tours</div>
                  </div>
                  <div className="text-center px-4">
                     <div className="text-3xl font-bold">50+</div>
                     <div className="text-sm opacity-80">Destinations</div>
                  </div>
                  <div className="text-center px-4">
                     <div className="text-3xl font-bold">4.9★</div>
                     <div className="text-sm opacity-80">Rating</div>
                  </div>
                  <div className="text-center px-4">
                     <div className="text-3xl font-bold">5K+</div>
                     <div className="text-sm opacity-80">Travelers</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

               {/* Sidebar Filter - Glass Effect */}
               <div className="xl:col-span-1 hidden xl:block">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 sticky top-8">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                           <Filter className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Explore Filters</h2>
                     </div>
                     <TourFilet />
                  </div>
               </div>

               {/* Main Content */}
               <div className="xl:col-span-3">
                  {/* Header with Filter Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                     <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                           Curated <span className="text-blue-400">Experiences</span>
                        </h2>
                        <p className="text-gray-300">Handpicked adventures for your next journey</p>
                     </div>
                     <Button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-lg"
                     >
                        <Filter className="w-4 h-4" />
                        Filter Tours
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                           {data?.length}
                        </div>
                     </Button>
                  </div>

                  {/* Tours Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {data?.map((item) => (
                        <div
                           key={item.slug}
                           className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden border border-gray-700/50 hover:border-blue-500/30"
                        >
                           {/* Favorite Button */}
                           <button
                              onClick={() => toggleFavorite(item._id)}
                              className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-red-500/20 transition-colors"
                           >
                              <Heart
                                 className={`w-5 h-5 ${favorites.has(item._id)
                                       ? 'fill-red-500 text-red-500'
                                       : 'text-white'
                                    }`}
                              />
                           </button>

                           {/* Share Button */}
                           <button className="absolute top-16 right-4 z-20 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-blue-500/20 transition-colors">
                              <Share2 className="w-5 h-5 text-white" />
                           </button>

                           {/* Image with Gradient Overlay */}
                           <div className="relative h-48 overflow-hidden">
                              <img
                                 src={item.images[0]}
                                 alt={item.title}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                              {/* Price Badge */}
                              <div className="absolute bottom-4 left-4">
                                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-lg">
                                    ৳{item?.costFrom?.toLocaleString()}
                                    <span className="text-sm font-normal opacity-90"> /person</span>
                                 </div>
                              </div>

                              {/* Rating */}
                              <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                 <span className="text-white text-sm font-medium">4.8</span>
                              </div>
                           </div>

                           {/* Content */}
                           <div className="p-6">
                              {/* Title and Location */}
                              <div className="mb-4">
                                 <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                 </h3>
                                 <div className="flex items-center gap-2 text-gray-300">
                                    <Navigation className="w-4 h-4 text-green-400" />
                                    <span className="text-sm">{item.departureLocation} → {item.arrivalLocation}</span>
                                 </div>
                              </div>

                              {/* Description */}
                              <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                 {item.description}
                              </p>

                              {/* Features Grid */}
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                       <Clock className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                       <div className="text-white text-sm font-medium">{item.tourPlan.length} Days</div>
                                       <div className="text-gray-400 text-xs">Duration</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                       <Users className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div>
                                       <div className="text-white text-sm font-medium">{item.maxGuest} People</div>
                                       <div className="text-gray-400 text-xs">Group Size</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg">
                                       <Calendar className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                       <div className="text-white text-sm font-medium">Age {item.minAge}+</div>
                                       <div className="text-gray-400 text-xs">Minimum Age</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/20 rounded-lg">
                                       <Shield className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div>
                                       <div className="text-white text-sm font-medium">Insured</div>
                                       <div className="text-gray-400 text-xs">Safety First</div>
                                    </div>
                                 </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex flex-wrap gap-2 mb-6">
                                 {item?.amenities?.slice(0, 3)?.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1">
                                       <CheckCircle className="w-3 h-3 text-green-400" />
                                       <span className="text-white text-xs">{amenity}</span>
                                    </div>
                                 ))}
                                 {item.amenities.length > 3 && (
                                    <div className="bg-white/5 rounded-full px-3 py-1">
                                       <span className="text-gray-400 text-xs">+{item.amenities.length - 3} more</span>
                                    </div>
                                 )}
                              </div>

                              {/* CTA Button */}
                              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-xl py-6 font-bold">
                                 <Link to={`/tours/${item._id}`} className="flex items-center justify-center gap-2">
                                    Explore Journey
                                    <ArrowRight className="w-5 h-5" />
                                 </Link>
                              </Button>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Empty State */}
                  {data?.length === 0 && (
                     <div className="text-center py-16">
                        <div className="w-32 h-32 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                           <MapPin className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Adventures Found</h3>
                        <p className="text-gray-400 text-lg mb-6">Try adjusting your filters to discover more journeys</p>
                        <Button
                           onClick={() => setOpen(true)}
                           className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                           Adjust Filters
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Mobile Filter Drawer - Glass Effect */}
         {open && (
            <div className="fixed inset-0 z-50 xl:hidden">
               {/* Overlay */}
               <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
               />

               {/* Drawer Content */}
               <div className="relative bg-gray-900 border-l border-white/10 w-80 h-full ml-auto shadow-2xl animate-in slide-in-from-right duration-300">
                  <div className="p-6 border-b border-white/10">
                     <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Filter Tours</h2>
                        <button
                           onClick={() => setOpen(false)}
                           className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                        >
                           ✕
                        </button>
                     </div>
                  </div>
                  <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
                     <TourFilet />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}