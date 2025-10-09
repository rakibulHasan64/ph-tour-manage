import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { useState } from "react";

// Example data for destinations
const destinations = [
   {
      id: 1,
      name: "Paris",
      image: "https://i.ibb.co/ymNr6HXP/download.jpg",
      description: "The city of love and lights.",
      rating: 4.9,
      reviews: 2847,
      price: "$1,299",
      popular: true
   },
   {
      id: 2,
      name: "New York",
      image: "https://i.ibb.co/WvJ9vy1M/images-2.jpg",
      description: "The city that never sleeps.",
      rating: 4.8,
      reviews: 3124,
      price: "$1,499",
      popular: true
   },
   {
      id: 3,
      name: "Tokyo",
      image: "https://i.ibb.co/BVg6FtpC/images-1.jpg",
      description: "A perfect blend of tradition and modernity.",
      rating: 4.7,
      reviews: 1987,
      price: "$1,799",
      popular: false
   },
   {
      id: 4,
      name: "Sydney",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Beautiful beaches and the iconic Opera House.",
      rating: 4.6,
      reviews: 1678,
      price: "$1,599",
      popular: true
   },
   {
      id: 5,
      name: "Bali",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Tropical paradise with rich culture.",
      rating: 4.9,
      reviews: 2456,
      price: "$899",
      popular: true
   },
   {
      id: 6,
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Majestic mountains and alpine beauty.",
      rating: 4.8,
      reviews: 1893,
      price: "$2,199",
      popular: false
   },
   {
      id: 7,
      name: "Santorini",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stunning sunsets and white architecture.",
      rating: 4.9,
      reviews: 2765,
      price: "$1,399",
      popular: true
   },
   {
      id: 8,
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern marvel in the desert.",
      rating: 4.7,
      reviews: 2143,
      price: "$1,699",
      popular: true
   },
];

export default function MostPopularDestinationSwiper() {
   const [favorites, setFavorites] = useState<number[]>([]);

   const toggleFavorite = (id: number) => {
      setFavorites(prev =>
         prev.includes(id)
            ? prev.filter(destId => destId !== id)
            : [...prev, id]
      );
   };

   return (
      <div className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16" data-aos="fade-up">
               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-6">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-sm font-semibold text-white">Top Rated Destinations</span>
               </div>

               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                  Most <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Popular</span> Destinations
               </h2>

               <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Discover the world's most sought-after travel destinations that capture the hearts of millions every year
               </p>
            </div>

            {/* Swiper Container */}
            <div className="relative" data-aos="fade-up" data-aos-delay="300">
               <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  speed={1000}
                  autoplay={{
                     delay: 3000,
                     disableOnInteraction: false,
                     pauseOnMouseEnter: true,
                  }}
                  coverflowEffect={{
                     rotate: 0,
                     stretch: 0,
                     depth: 100,
                     modifier: 2.5,
                     slideShadows: true,
                  }}
                  pagination={{
                     clickable: true,
                     el: '.destination-pagination',
                     bulletClass: 'swiper-pagination-bullet bg-white/30',
                     bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
                  }}
                  navigation={{
                     nextEl: '.destination-next',
                     prevEl: '.destination-prev',
                  }}
                  modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                  className="destinationSwiper pb-16"
                  breakpoints={{
                     0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        coverflowEffect: {
                           rotate: 10,
                           stretch: 0,
                           depth: 50,
                           modifier: 1,
                        }
                     },
                     640: {
                        slidesPerView: 1.2,
                        spaceBetween: 25,
                     },
                     768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        coverflowEffect: {
                           rotate: 0,
                           stretch: 0,
                           depth: 100,
                           modifier: 2,
                        }
                     },
                     1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 40,
                     },
                     1280: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                        coverflowEffect: {
                           rotate: 0,
                           stretch: 0,
                           depth: 150,
                           modifier: 2.5,
                        }
                     },
                  }}
               >
                  {destinations.map((dest) => (
                     <SwiperSlide key={dest.id}>
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4">
                           {/* Image Container */}
                           <div className="relative h-80 overflow-hidden">
                              <img
                                 src={dest.image}
                                 alt={dest.name}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                              {/* Favorite Button */}
                              <button
                                 onClick={() => toggleFavorite(dest.id)}
                                 className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
                              >
                                 <Heart
                                    className={`w-6 h-6 transition-all duration-300 ${favorites.includes(dest.id)
                                          ? "text-red-500 fill-current scale-110"
                                          : "text-white"
                                       }`}
                                 />
                              </button>

                              {/* Popular Badge */}
                              {dest.popular && (
                                 <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl text-sm font-bold shadow-lg flex items-center gap-2">
                                       <Star className="w-4 h-4" fill="currentColor" />
                                       Popular
                                    </span>
                                 </div>
                              )}

                              {/* Price */}
                              <div className="absolute bottom-4 left-4">
                                 <span className="text-3xl font-black text-white">{dest.price}</span>
                                 <span className="text-white/80 text-sm ml-1">starting from</span>
                              </div>

                              {/* Rating */}
                              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-2">
                                 <div className="flex items-center gap-1 text-white">
                                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                    <span className="font-bold">{dest.rating}</span>
                                    <span className="text-white/80 text-sm">({dest.reviews})</span>
                                 </div>
                              </div>
                           </div>

                           {/* Content */}
                           <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                 <MapPin className="w-5 h-5 text-red-500" />
                                 <h3 className="text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {dest.name}
                                 </h3>
                              </div>

                              <p className="text-gray-600 mb-4 leading-relaxed">
                                 {dest.description}
                              </p>

                              <button className="group/btn w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                 Explore Destination
                                 <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                           </div>

                           {/* Hover Effect Border */}
                           <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-500 pointer-events-none"></div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>

               {/* Custom Navigation */}
               <div className="flex justify-center items-center gap-4 mt-8">
                  <button className="destination-prev w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                  </button>

                  <div className="destination-pagination flex gap-2"></div>

                  <button className="destination-next w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                  </button>
               </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16" data-aos="fade-up">
               <p className="text-gray-300 mb-6">Can't find what you're looking for?</p>
               <button className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  View All 150+ Destinations
               </button>
            </div>
         </div>

         {/* Add custom styles for Swiper */}
         <style>{`
        .destinationSwiper {
          padding: 20px 0;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          transform: scale(1.2);
        }
        .destinationSwiper .swiper-slide {
          transition: all 0.4s ease;
        }
        .destinationSwiper .swiper-slide-active {
          transform: scale(1.05);
        }
      `}</style>
      </div>
   );
}