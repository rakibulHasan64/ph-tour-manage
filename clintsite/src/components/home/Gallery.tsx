import Aos from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Gallery() {
   // Sample tour data

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
         image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
         id: 2,
         title: "Beach Paradise",
         location: "Maldives",

         duration: "5 days",
         category: "beach",
         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
         id: 3,
         title: "Cultural Journey",
         location: "Kyoto, Japan",
         duration: "10 days",
         category: "cultural",
         image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
         id: 4,
         title: "Safari Experience",
         location: "Serengeti, Tanzania",
         price: "$1,499",
         duration: "8 days",
         category: "adventure",
         image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
         id: 5,
         title: "City Explorer",
         location: "New York, USA",
      
         duration: "4 days",
         category: "urban",
         image: "https://i.ibb.co.com/79QptdB/b.jpg"
      },
      {
         id: 6,
         title: "Island Getaway",
         location: "Santorini, Greece",
   
         duration: "6 days",
         category: "beach",
         image: "https://i.ibb.co.com/WWHdV8WG/aeri.jpg"
      }
   ];

   // State for filtering tours
   const [filter, setFilter] = useState("all");
   const [visibleTours, setVisibleTours] = useState(6);
   const navigate = useNavigate();

   const filteredTours = tours.filter(tour =>
      filter === "all" ? true : tour.category === filter
   );

   const loadMore = () => {
      setVisibleTours(prev => prev + 3);
   };

   return (
      <>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
               {/* Header */}
               <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Tours</h1>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                     Discover breathtaking destinations and create unforgettable memories with our carefully curated tour packages.
                  </p>
               </div>

               {/* Filter buttons */}
               <div className="flex justify-center flex-wrap gap-3 mb-10">
                  {["all", "adventure", "beach", "cultural", "urban"].map(category => (
                     <button
                        key={category}
                        onClick={() => {
                           setFilter(category);
                           setVisibleTours(6);
                        }}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${filter === category
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white text-gray-700 hover:bg-blue-100 shadow-md"
                           }`}
                     >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                     </button>
                  ))}
               </div>

               {/* Tours grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours?.slice(0, visibleTours)?.map(tour => (
                     <div data-aos="fade-up" key={tour.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="relative h-56 overflow-hidden">
                           <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-full object-cover"
                           />
                        
                        </div>
                        <div className="p-6">
                           <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
                           <div className="flex items-center text-gray-600 mb-4">
                              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{tour.location}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 {tour.duration}
                              </span>
                              <button
                                 onClick={() => navigate(`/tours`)} 
                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                               Read More
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Load more button */}
               {visibleTours < filteredTours?.length && (
                  <div className="text-center mt-12">
                     <button
                        onClick={loadMore}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                     >
                        Load More Tours
                     </button>
                  </div>
               )}
            </div>
         </div>
      </>
   );
}

export default Gallery;