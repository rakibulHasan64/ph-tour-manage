import Aos from "aos";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { MapPin, Clock, Star, Heart, ArrowRight, Filter } from "lucide-react";

function Gallery() {
   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const tours = [
      {
         id: 1,
         title: "Mountain Adventure",
         location: "Swiss Alps",
         duration: "7 days",
         category: "adventure",
         price: "$1,299",
         rating: 4.8,
         reviews: 124,
         image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: true
      },
      {
         id: 2,
         title: "Beach Paradise",
         location: "Maldives",
         duration: "5 days",
         category: "beach",
         price: "$899",
         rating: 4.9,
         reviews: 89,
         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: false
      },
      {
         id: 3,
         title: "Cultural Journey",
         location: "Kyoto, Japan",
         duration: "10 days",
         category: "cultural",
         price: "$1,599",
         rating: 4.7,
         reviews: 156,
         image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: true
      },
      {
         id: 4,
         title: "Safari Experience",
         location: "Serengeti, Tanzania",
         duration: "8 days",
         category: "adventure",
         price: "$1,499",
         rating: 4.6,
         reviews: 78,
         image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: false
      },
      {
         id: 5,
         title: "City Explorer",
         location: "New York, USA",
         duration: "4 days",
         category: "urban",
         price: "$799",
         rating: 4.5,
         reviews: 203,
         image: "https://i.ibb.co.com/79QptdB/b.jpg",
         featured: false
      },
      {
         id: 6,
         title: "Island Getaway",
         location: "Santorini, Greece",
         duration: "6 days",
         category: "beach",
         price: "$1,199",
         rating: 4.8,
         reviews: 167,
         image: "https://i.ibb.co.com/WWHdV8WG/aeri.jpg",
         featured: true
      },
      {
         id: 7,
         title: "Tropical Rainforest",
         location: "Costa Rica",
         duration: "7 days",
         category: "adventure",
         price: "$1,099",
         rating: 4.7,
         reviews: 92,
         image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: false
      },
      {
         id: 8,
         title: "Historical Tour",
         location: "Rome, Italy",
         duration: "5 days",
         category: "cultural",
         price: "$1,349",
         rating: 4.9,
         reviews: 234,
         image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
         featured: true
      }
   ];

   const [filter, setFilter] = useState("all");
   const [visibleTours, setVisibleTours] = useState(6);
   const [favorites, setFavorites] = useState<number[]>([]);
   const navigate = useNavigate();
   const canvasRef = useRef<HTMLCanvasElement>(null);



   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // ✅ Resize handler
      const resizeCanvas = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // ✅ Particle class without constructor shorthand
      class Particle {
         canvas: HTMLCanvasElement;
         ctx: CanvasRenderingContext2D;
         x: number;
         y: number;
         size: number;
         speedX: number;
         speedY: number;
         color: string;
         type: string;

         constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 255
               }, ${Math.random() * 0.3 + 0.1})`;
            this.type = "circle";
         }

         update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > this.canvas.width) this.x = 0;
            else if (this.x < 0) this.x = this.canvas.width;

            if (this.y > this.canvas.height) this.y = 0;
            else if (this.y < 0) this.y = this.canvas.height;
         }

         draw() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
         }
      }

      // ✅ Create particles
      const particles: Particle[] = [];
      for (let i = 0; i < 100; i++) {
         particles.push(new Particle(canvas, ctx));
      }

      // ✅ Animation loop
      let animationFrameId: number;

      const animate = () => {
         ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
         ctx.fillRect(0, 0, canvas.width, canvas.height);

         particles.forEach((p) => {
            p.update();
            p.draw();
         });

         animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // ✅ Cleanup
      return () => {
         window.removeEventListener("resize", resizeCanvas);
         cancelAnimationFrame(animationFrameId); // stop animation on unmount
      };
   }, []);
   



   const filteredTours = tours.filter(tour =>
      filter === "all" ? true : tour.category === filter
   );

   const loadMore = () => {
      setVisibleTours(prev => prev + 4);
   };

   const toggleFavorite = (id: number) => {
      setFavorites(prev =>
         prev.includes(id)
            ? prev.filter(tourId => tourId !== id)
            : [...prev, id]
      );
   };

   const getCategoryColor = (category: string) => {
      const colors = {
         adventure: "from-green-500 to-emerald-600",
         beach: "from-blue-500 to-cyan-600",
         cultural: "from-purple-500 to-indigo-600",
         urban: "from-orange-500 to-red-600"
      };
      return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
   };

   const getCategoryIcon = (category: string) => {
      const icons = {
         adventure: "⛰️",
         beach: "🏖️",
         cultural: "🏛️",
         urban: "🏙️"
      };
      return icons[category as keyof typeof icons] || "✈️";
   };

   return (
      <>
         {/* Animated Background */}
         <div className="fixed inset-0 -z-10 overflow-hidden">
            <canvas
               ref={canvasRef}
               className="absolute inset-0 w-full h-full"
            />

            {/* Gradient Orbs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div className="grid grid-cols-12 gap-4 w-full h-full">
                  {Array.from({ length: 144 }).map((_, i) => (
                     <div key={i} className="border border-gray-500/30 rounded"></div>
                  ))}
               </div>
            </div>

            {/* Floating Elements */}
            {[...Array(15)].map((_, i) => (
               <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     animation: `float ${15 + Math.random() * 20}s linear infinite`,
                     animationDelay: `${Math.random() * 5}s`
                  }}
               ></div>
            ))}
         </div>

         {/* Main Content */}
         <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative z-10">
               {/* Header */}
               <div className="text-center mb-16" data-aos="fade-up">
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-200 shadow-sm mb-6">
                     <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                     <span className="text-sm font-semibold text-blue-800">Popular Destinations</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
                     Discover <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Amazing</span> Tours
                  </h1>

                  <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
                     Explore breathtaking destinations and create unforgettable memories with our carefully curated tour packages around the world.
                  </p>
               </div>

               {/* Filter buttons */}
               <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12" data-aos="fade-up">
                  <div className="flex items-center gap-3">
                     <Filter className="w-5 h-5 text-white" />
                     <span className="font-semibold text-white">Filter by:</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                     {[
                        { key: "all", label: "All Tours", emoji: "🌍" },
                        { key: "adventure", label: "Adventure", emoji: "⛰️" },
                        { key: "beach", label: "Beach", emoji: "🏖️" },
                        { key: "cultural", label: "Cultural", emoji: "🏛️" },
                        { key: "urban", label: "Urban", emoji: "🏙️" }
                     ].map(category => (
                        <button
                           key={category.key}
                           onClick={() => {
                              setFilter(category.key);
                              setVisibleTours(6);
                           }}
                           className={`px-5 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2 backdrop-blur-sm ${filter === category.key
                              ? `bg-gradient-to-r ${getCategoryColor(category.key)} text-white shadow-lg`
                              : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                              }`}
                        >
                           <span className="text-lg">{category.emoji}</span>
                           <span className="font-semibold">{category.label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Tours grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredTours?.slice(0, visibleTours)?.map((tour, index) => (
                     <div
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        key={tour.id}
                        className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-white/10 transition-all duration-500 transform hover:-translate-y-2"
                     >
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden">
                           <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                           />

                           {/* Overlay Gradient */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                           {/* Category Badge */}
                           <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(tour.category)} shadow-lg backdrop-blur-sm`}>
                                 {getCategoryIcon(tour.category)} {tour.category}
                              </span>
                           </div>

                           {/* Favorite Button */}
                           <button
                              onClick={() => toggleFavorite(tour.id)}
                              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30"
                           >
                              <Heart
                                 className={`w-5 h-5 transition-colors ${favorites.includes(tour.id)
                                    ? "text-red-500 fill-current"
                                    : "text-white"
                                    }`}
                              />
                           </button>

                           {/* Featured Badge */}
                           {tour.featured && (
                              <div className="absolute top-16 left-4">
                                 <span className="px-3 py-1.5 bg-yellow-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1 backdrop-blur-sm">
                                    <Star className="w-3 h-3" fill="currentColor" />
                                    Featured
                                 </span>
                              </div>
                           )}

                           {/* Price */}
                           <div className="absolute bottom-4 left-4">
                              <span className="text-2xl font-black text-white">{tour.price}</span>
                              <span className="text-white/80 text-sm ml-1">per person</span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                           <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {tour.title}
                           </h3>

                           <div className="flex items-center text-white mb-3">
                              <MapPin className="w-4 h-4 mr-2 text-red-400" />
                              <span className="font-medium">{tour.location}</span>
                           </div>

                           <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4 text-sm text-white">
                                 <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    {tour.duration}
                                 </span>

                                 <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                    {tour.rating} ({tour.reviews} reviews)
                                 </span>
                              </div>
                           </div>

                           <div className="flex flex-col sm:flex-row justify-between items-center text-sm pt-4 border-t border-white/20 gap-3 sm:gap-0">
                              <button
                                 onClick={() => navigate(`/tours`)}
                                 className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg group/btn w-full sm:w-auto"
                              >
                                 Explore Tour
                                 <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                              </button>

                              <button className="px-4 py-2 text-white hover:text-blue-400 font-medium transition-colors w-full sm:w-auto text-center">
                                 Quick View
                              </button>
                           </div>

                        </div>
                     </div>
                  ))}
               </div>

               {/* Load more button */}
               {visibleTours < filteredTours?.length && (
                  <div className="text-center mt-16" data-aos="fade-up">
                     <button
                        onClick={loadMore}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-bold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
                     >
                        Load More Tours
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>

                     <p className="text-white/70 mt-4">
                        Showing {Math.min(visibleTours, filteredTours.length)} of {filteredTours.length} amazing tours
                     </p>
                  </div>
               )}

               {/* No results message */}
               {filteredTours.length === 0 && (
                  <div className="text-center py-16" data-aos="fade-up">
                     <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">🔍</span>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">No tours found</h3>
                     <p className="text-white/70">Try selecting a different filter to see more options.</p>
                  </div>
               )}
            </div>
         </div>

         {/* Custom CSS for animations */}
         <style>{`
            @keyframes float {
               0%, 100% { transform: translateY(0) rotate(0deg); }
               50% { transform: translateY(-20px) rotate(180deg); }
            }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
         `}</style>
      </>
   );
}

export default Gallery;