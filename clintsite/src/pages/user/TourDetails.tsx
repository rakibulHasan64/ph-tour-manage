import { differenceInDays, format } from "date-fns";
import { Link, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { useGetAllToursQuery } from "../../redux/featuer/tour/tour.api";
import { useGetDivisionsQuery } from "../../redux/featuer/divison/Divison.api";
import { useState, useEffect, type JSX } from "react";
import Loading from "../../components/layout/Loding";
import {
   MapPin,
   Clock,
   Users,
   Calendar,
   Star,
   Heart,
   Share2,
   Navigation,
   Check,
   X,
   Shield,
   ArrowRight,
   ChevronLeft,
   ChevronRight,
   Utensils,
   Wifi,
   Car,
   Hotel,
   Mountain,
   Camera,
   Sparkles
} from "lucide-react";


// TypeScript Interfaces
interface Tour {
   _id: string;
   slug: string;
   title: string;
   description: string;
   images: string[];
   costFrom: number;
   maxGuest: number;
   minAge: number;
   tourPlan: string[];
   included: string[];
   excluded: string[];
   amenities: string[];
   departureLocation: string;
   arrivalLocation: string;
   startDate: string;
   endDate: string;
   division: string;
   location: string;
}

// interface Division {
//    _id: string;
//    name: string;
// }

export default function TourDetails() {
   const { id } = useParams<{ id: string }>();
   const { data, isLoading } = useGetAllToursQuery({ _id: id });
   const [activeImage, setActiveImage] = useState<number>(0);
   const [isFavorite, setIsFavorite] = useState<boolean>(false);
   const [isScrolled, setIsScrolled] = useState<boolean>(false);


   const { data: divisionData } = useGetDivisionsQuery(
      {
         _id: data?.[0]?.division,
         fields: "name",
      },
      {
         skip: !data,
      }
   );

   const tourData: Tour | undefined = data?.[0];

   // Scroll effect
   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 100);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Image navigation
   const nextImage = (): void => {
      if (!tourData?.images) return;
      setActiveImage((prev) =>
         prev === (tourData.images.length - 1) ? 0 : prev + 1
      );
   };

   const prevImage = (): void => {
      if (!tourData?.images) return;
      setActiveImage((prev) =>
         prev === 0 ? (tourData.images.length - 1) : prev - 1
      );
   };

   // Amenity icon mapper
   const getAmenityIcon = (amenity: string): JSX.Element => {
      const lowerAmenity = amenity.toLowerCase();
      if (lowerAmenity.includes('wifi')) return <Wifi className="w-4 h-4" />;
      if (lowerAmenity.includes('food') || lowerAmenity.includes('meal')) return <Utensils className="w-4 h-4" />;
      if (lowerAmenity.includes('car') || lowerAmenity.includes('transport')) return <Car className="w-4 h-4" />;
      if (lowerAmenity.includes('hotel') || lowerAmenity.includes('accommodation')) return <Hotel className="w-4 h-4" />;
      if (lowerAmenity.includes('photo') || lowerAmenity.includes('camera')) return <Camera className="w-4 h-4" />;
      if (lowerAmenity.includes('mountain') || lowerAmenity.includes('trek')) return <Mountain className="w-4 h-4" />;
      return <Sparkles className="w-4 h-4" />;
   };

   // Loading state
   if (isLoading) {
      return <Loading />;
   }

   // Error state - no data
   if (!tourData) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
               <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <div className="text-2xl">⚠️</div>
               </div>
               <h3 className="text-xl font-bold mb-2">Tour Not Found</h3>
               <p className="text-gray-300">The requested tour could not be loaded.</p>
               <Button asChild className="mt-4">
                  <Link to="/tours">Back to Tours</Link>
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
         {/* Floating Navigation Bar */}
         <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent py-4 hidden'
            }`}>
            <div className="container mx-auto px-4">
               <div className="flex items-center justify-between">
                  <Link
                     to="/tours"
                     className="flex items-center gap-2 text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
                  >
                     <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                     </div>
                     <span className="font-semibold text-sm md:text-base">Back to Tours</span>
                  </Link>

                  <div className="flex items-center gap-2">
                     <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${isFavorite
                              ? 'bg-red-500/20 text-red-400 shadow-lg'
                              : 'bg-white/10 text-white hover:bg-white/20'
                           }`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                     >
                        <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? 'fill-red-400' : ''}`} />
                     </button>
                     <button
                        className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                        aria-label="Share tour"
                     >
                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </nav>



         {/* Hero Section */}
         <section className="relative h-screen min-h-[600px] max-h-[800px] overflow-hidden">
            {/* Background Image with Parallax */}
            <div
               className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-700"
               style={{
                  backgroundImage: `url(${tourData.images[1]})`,
                  transform: `scale(${isScrolled ? 1.1 : 1}) translateY(${isScrolled ? '-5%' : '0'})`
               }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/60 to-purple-900/80" />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/20" /> */}

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
               <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
               <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Hero Content */}
            <div className="relative top-10 z-20 h-full flex items-end pb-16 md:pb-20 lg:pb-24">
               <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                     {/* Badges */}
                     <div className="flex flex-wrap gap-3 mb-6 animate-fade-in-up">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-2xl text-white font-semibold text-sm shadow-lg transform hover:scale-105 transition-transform duration-300">
                           {divisionData?.[0]?.name || "Premium Tour"}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-white font-semibold text-sm flex items-center gap-1 transform hover:scale-105 transition-transform duration-300">
                           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                           4.8 (124 Reviews)
                        </div>
                        <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-green-400 font-semibold text-sm flex items-center gap-1 transform hover:scale-105 transition-transform duration-300">
                           <Shield className="w-4 h-4" />
                           Fully Insured
                        </div>
                     </div>

                     {/* Main Title */}
                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in-up">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                           {tourData.title}
                        </span>
                     </h1>

                     {/* Key Features */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white border border-white/10 transform hover:scale-105 transition-all duration-300 group">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <MapPin className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                 <div className="text-sm opacity-80">Location</div>
                                 <div className="font-semibold text-lg">{tourData.location}</div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white border border-white/10 transform hover:scale-105 transition-all duration-300 group">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <Clock className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                 <div className="text-sm opacity-80">Duration</div>
                                 <div className="font-semibold text-lg">{tourData.tourPlan.length} Days</div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white border border-white/10 transform hover:scale-105 transition-all duration-300 group">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                 <Users className="w-6 h-6 text-purple-400" />
                              </div>
                              <div>
                                 <div className="text-sm opacity-80">Group Size</div>
                                 <div className="font-semibold text-lg">Max {tourData.maxGuest}</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* CTA Button */}
                     <div className="animate-fade-in-up">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                           <Link
                              to={`/booking/${tourData._id}`}
                              state={{
                                 image: tourData.images[2],
                                 title: tourData.title,
                                 price: tourData.costFrom
                              }}
                              className="flex items-center gap-3 relative z-10"
                           >
                              <span>Book This Adventure</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                           </Link>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            
         </section>
         {/* Main Content */}
         <main className="relative z-20 mt-20">
            <div className="container mx-auto px-4">
               <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                  {/* Main Content */}
                  <div className="xl:col-span-3 space-y-8">
                     {/* Image Gallery */}
                     <section className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
                        <div className="relative group">
                           {/* Main Image */}
                           <div className="aspect-w-16 aspect-h-9 h-64 sm:h-80 md:h-96 lg:h-[500px]">
                              <img
                                 src={tourData.images[activeImage]}
                                 alt={tourData.title}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                           </div>

                           {/* Gradient Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                           {/* Navigation Arrows */}
                           <button
                              onClick={prevImage}
                              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 shadow-lg opacity-80 group-hover:opacity-100 active:scale-95"
                              aria-label="Previous image"
                           >
                              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                           </button>
                           <button
                              onClick={nextImage}
                              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 shadow-lg opacity-80 group-hover:opacity-100 active:scale-95"
                              aria-label="Next image"
                           >
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                           </button>

                           {/* Image Counter */}
                           <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                              {activeImage + 1} / {tourData.images.length}
                           </div>

                           {/* Mobile Swipe Indicator */}
                           <div className="absolute bottom-3 left-3 sm:hidden">
                              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                                 <div className="flex gap-0.5">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                 </div>
                                 <span className="ml-1">Swipe</span>
                              </div>
                           </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="p-4 sm:p-6">
                           <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                              {tourData.images.map((image: string, index: number) => (
                                 <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`relative cursor-pointer rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 group ${activeImage === index
                                          ? 'ring-2 sm:ring-3 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-gray-800 scale-105 shadow-lg'
                                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                                       }`}
                                    aria-label={`View image ${index + 1}`}
                                    aria-current={activeImage === index ? 'true' : 'false'}
                                 >
                                    <img
                                       src={image}
                                       alt={`${tourData.title} ${index + 1}`}
                                       className="w-full h-14 sm:h-16 md:h-20 object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {/* Active Indicator */}
                                    {activeImage === index && (
                                       <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400 rounded-lg sm:rounded-xl" />
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg sm:rounded-xl" />
                                 </button>
                              ))}
                           </div>
                        </div>
                     </section>

                     {/* Tour Description */}
                     <section className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-700/50">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6 flex items-center gap-3">
                           <div className="w-2 h-6 md:h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                           About The Experience
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                           {tourData.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                           <div className="text-center group">
                              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                 <Clock className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-blue-400" />
                              </div>
                              <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">{tourData.tourPlan.length}</div>
                              <div className="text-gray-400 text-xs md:text-sm">Days</div>
                           </div>
                           <div className="text-center group">
                              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                 <Users className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-green-400" />
                              </div>
                              <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">{tourData.maxGuest}</div>
                              <div className="text-gray-400 text-xs md:text-sm">People</div>
                           </div>
                           <div className="text-center group">
                              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-500/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                 <Calendar className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-purple-400" />
                              </div>
                              <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">Age {tourData.minAge}+</div>
                              <div className="text-gray-400 text-xs md:text-sm">Minimum</div>
                           </div>
                           <div className="text-center group">
                              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-orange-500/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                 <Shield className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-orange-400" />
                              </div>
                              <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">Insured</div>
                              <div className="text-gray-400 text-xs md:text-sm">Safety</div>
                           </div>
                        </div>
                     </section>

                     {/* Tour Plan */}
                     <section className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-700/50">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-6 md:mb-8 flex items-center gap-3">
                           <div className="w-2 h-6 md:h-8 bg-gradient-to-b from-green-500 to-blue-600 rounded-full"></div>
                           Journey Timeline
                        </h2>
                        <div className="space-y-4 md:space-y-6 lg:space-y-8">
                           {tourData.tourPlan.map((plan: string, index: number) => (
                              <div key={index} className="flex group">
                                 <div className="flex flex-col items-center mr-4 md:mr-6">
                                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-lg lg:text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                       {index + 1}
                                    </div>
                                    {index < (tourData.tourPlan.length - 1) && (
                                       <div className="w-1 h-12 md:h-16 lg:h-20 bg-gradient-to-b from-green-400/30 to-blue-500/30 my-1 md:my-2 rounded-full"></div>
                                    )}
                                 </div>
                                 <div className="bg-gray-700/50 p-4 md:p-6 rounded-xl md:rounded-2xl flex-1 transform group-hover:-translate-y-1 transition-all duration-300 border border-gray-600/50 backdrop-blur-sm">
                                    <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed">{plan}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </section>

                     {/* Included/Excluded */}
                     <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-600/20">
                           <div className="flex items-center gap-4 mb-6">
                              <div className=" bg-green-500/20 rounded-2xl flex items-center justify-center">
                                 <Check className="w-8 h-8 text-green-400" />
                              </div>
                              <h3 className="text-xl md:text-2xl font-black text-green-400">What's Included</h3>
                           </div>
                           <ul className="space-y-4">
                              {tourData.included.map((item: string, index: number) => (
                                 <li key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-500/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                       <Check className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-200 text-lg">{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-red-600/20">
                           <div className="flex items-center gap-4 mb-6">
                              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center">
                                 <X className="w-8 h-8 text-red-400" />
                              </div>
                              <h3 className="text-2xl font-black text-red-400">What's Excluded</h3>
                           </div>
                           <ul className="space-y-4">
                              {tourData.excluded.map((item: string, index: number) => (
                                 <li key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                       <X className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-200 text-lg">{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </section>
                  </div>

                  {/* Sidebar - Booking & Info */}
                  <aside className="xl:col-span-1 space-y-6">
                     {/* Booking Card */}
                     <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50 sticky top-8">
                        <div className="text-center mb-8">
                           <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                              ৳{tourData.costFrom.toLocaleString()}
                           </div>
                           <div className="text-gray-400 text-lg">per person</div>
                        </div>

                        <div className="space-y-4 mb-8">
                           <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50">
                              <div className="flex items-center gap-3">
                                 <Calendar className="w-5 h-5 text-blue-400" />
                                 <span className="font-medium text-gray-300">Dates</span>
                              </div>
                              <span className="text-white font-semibold text-right text-sm">
                                 {format(
                                    new Date(tourData.startDate),
                                    "MMM dd"
                                 )} - {format(
                                    new Date(tourData.endDate),
                                    "MMM dd, yyyy"
                                 )}
                              </span>
                           </div>

                           <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50">
                              <div className="flex items-center gap-3">
                                 <Clock className="w-5 h-5 text-green-400" />
                                 <span className="font-medium text-gray-300">Duration</span>
                              </div>
                              <span className="text-white font-semibold">
                                 {differenceInDays(
                                    new Date(tourData.endDate),
                                    new Date(tourData.startDate)
                                 ) + 1} days
                              </span>
                           </div>

                           <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50">
                              <div className="flex items-center gap-3">
                                 <Users className="w-5 h-5 text-purple-400" />
                                 <span className="font-medium text-gray-300">Min Age</span>
                              </div>
                              <span className="text-white font-semibold">{tourData.minAge} years</span>
                           </div>
                        </div>

                        <Button className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
                           <Link
                              to={`/booking/${tourData._id}`}
                              state={{
                                 image: tourData.images[2],
                                 title: tourData.title,
                                 price: tourData.costFrom
                              }}
                              className="flex items-center justify-center gap-2 w-full"
                           >
                              Book Now
                              <ArrowRight className="w-5 h-5" />
                           </Link>
                        </Button>

                        <div className="text-center mt-4 text-sm text-gray-400">
                           🎉 Free cancellation within 24 hours
                        </div>
                     </div>

                     {/* Tour Information */}
                     <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                        <h3 className="text-2xl font-black text-white mb-6">Tour Details</h3>
                        <div className="space-y-4">
                           <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 group">
                              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <Navigation className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                 <div className="font-semibold text-gray-300">Division</div>
                                 <div className="text-gray-400">{divisionData?.[0]?.name}</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 group">
                              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <MapPin className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                 <div className="font-semibold text-gray-300">Departure</div>
                                 <div className="text-gray-400">{tourData.departureLocation}</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 group">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                 <MapPin className="w-6 h-6 text-purple-400" />
                              </div>
                              <div>
                                 <div className="font-semibold text-gray-300">Arrival</div>
                                 <div className="text-gray-400">{tourData.arrivalLocation}</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Amenities */}
                     <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                        <h3 className="text-2xl font-black text-white mb-6">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                           {tourData.amenities.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-xl border border-gray-600/50 group hover:bg-gray-700 transition-all duration-300">
                                 <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    {getAmenityIcon(amenity)}
                                 </div>
                                 <span className="text-sm text-gray-300 font-medium truncate">{amenity}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </aside>
               </div>
            </div>
         </main>
      </div>
   );
}
