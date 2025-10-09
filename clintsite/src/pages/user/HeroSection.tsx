import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { useGetDivisionsQuery } from "../../redux/featuer/divison/Divison.api";
import Aos from "aos";
import { Search, MapPin, Star, Users, Calendar } from "lucide-react";

export default function HeroSection() {
   const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined);

   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const { data: divisionData } = useGetDivisionsQuery(undefined);

   const divisionOption = divisionData?.map(
      (item: { _id: string; name: string }) => ({
         label: item.name,
         value: item._id,
      })
   );

   return (
      <section className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed">
         {/* Background Image with Overlay */}
         <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
               backgroundImage: "url('/pexels-asadphoto-1450340 (1).jpg')",
            }}
         />

         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>

         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-100 right-100 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-20 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>

            <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-blue-800 rounded-full animate-pulse delay-700"></div>


            <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-red-800 rounded-full animate-pulse delay-700"></div>

            <div className="absolute bottom-20 right-10 w-3 h-3 bg-red-400 rounded-full animate-pulse delay-500"></div>
            <div className="absolute -bottom-2 right-1 w-3 h-3 bg-pink-700-400 rounded-full animate-pulse delay-500"></div>
         </div>

         {/* Main Content */}
         <div className="relative z-20 container mx-auto px-4 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  {/* Text Content */}
                  <div data-aos="fade-right" className="text-white space-y-8 mt-23 ">
                     <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="text-sm  font-medium">#1 Travel Destination in South Asia</span>
                     </div>

                     <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                        Discover The{' '}
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                           Hidden Gems
                        </span>{' '}
                        of Bangladesh
                     </h1>

                     <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
                        Experience the vibrant culture, breathtaking landscapes, and rich heritage of Bangladesh.
                        From the world's longest sea beach to the mystical Sundarbans mangrove forest.
                     </p>

                     {/* Stats */}
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                        {[
                           { number: '500+', label: 'Tour Packages' },
                           { number: '50K+', label: 'Happy Travelers' },
                           { number: '8', label: 'Divisions' }
                        ].map((stat, index) => (
                           <div key={index} className="text-center">
                              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.number}</div>
                              <div className="text-sm text-gray-300">{stat.label}</div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Search Card */}
                  <div data-aos="fade-left" data-aos-delay="300" className="relative">
                     <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
                        <div className="text-center mb-6">
                           <h3 className="text-2xl font-bold text-white mb-2">Find Your Perfect Tour</h3>
                           <p className="text-gray-300">Explore Bangladesh's diverse regions</p>
                        </div>

                        <div className="space-y-6">
                           {/* Division Select */}
                           <div className="space-y-3">
                              <label className="flex items-center gap-2 text-white font-semibold">
                                 <MapPin className="w-5 h-5 text-yellow-400" />
                                 Select Division
                              </label>
                              <Select onValueChange={(value) => setSelectedDivision(value)}>
                                 <SelectTrigger className="w-full h-14 bg-white/5 border-white/20 text-white backdrop-blur-sm">
                                    <SelectValue placeholder="Choose a division..." />
                                 </SelectTrigger>
                                 <SelectContent className="bg-white border-white/20 backdrop-blur-sm">
                                    <SelectGroup>
                                       <SelectLabel className="text-gray-600">Divisions</SelectLabel>
                                       {divisionOption?.map(
                                          (item: { value: string; label: string }) => (
                                             <SelectItem
                                                key={item.value}
                                                value={item.value}
                                                className="hover:bg-gray-100 cursor-pointer"
                                             >
                                                {item.label}
                                             </SelectItem>
                                          )
                                       )}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           </div>

                           {/* Quick Features */}
                           <div className="grid grid-cols-3 gap-4 text-center">
                              {[
                                 { icon: Users, label: 'Group Tours' },
                                 { icon: Calendar, label: 'Flexible Dates' },
                                 { icon: Star, label: 'Top Rated' }
                              ].map((feature, index) => (
                                 <div key={index} className="text-white/80">
                                    <feature.icon className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                                    <span className="text-xs">{feature.label}</span>
                                 </div>
                              ))}
                           </div>

                           {/* Search Button */}
                           <div className="pt-4">
                              {selectedDivision ? (
                                 <Button
                                    className="w-full h-14 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    asChild
                                 >
                                    <Link to={`/tours?division=${selectedDivision}`} className="flex items-center justify-center gap-3">
                                       <Search className="w-5 h-5" />
                                       Explore {divisionOption?.find((d: { value: string; }) => d.value === selectedDivision)?.label}
                                    </Link>
                                 </Button>
                              ) : (
                                 <Button
                                    className="w-full h-14 bg-gray-600 text-gray-300 font-bold text-lg rounded-xl cursor-not-allowed"
                                    disabled
                                 >
                                    <Search className="w-5 h-5 mr-2" />
                                    Select a Division
                                 </Button>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Floating Elements */}
                     <div className="absolute -top-4 -right-0 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                     <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-300"></div>
                     <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-600 rounded-full animate-bounce delay-300"></div>

                     <div className="absolute -top-4  -left-1 w-8 h-8 bg-[#FE4723] rounded-full animate-bounce"></div>
                     
                  </div>
               </div>

               {/* Scroll Indicator */}
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-white/60 text-sm mb-2">Scroll to Explore</div>
                  <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center mx-auto">
                     <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Gradient */}
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>
   );
}