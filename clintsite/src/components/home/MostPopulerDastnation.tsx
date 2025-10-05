import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

// Example data for destinations
const destinations = [
   { id: 1, name: "Paris", image: "https://i.ibb.co/ymNr6HXP/download.jpg", description: "The city of love and lights." },
   { id: 2, name: "New York", image: "https://i.ibb.co/WvJ9vy1M/images-2.jpg", description: "The city that never sleeps." },
   { id: 3, name: "Tokyo", image: "https://i.ibb.co/BVg6FtpC/images-1.jpg", description: "A perfect blend of tradition and modernity." },
   { id: 4, name: "Sydney", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Beautiful beaches and the iconic Opera House." },
   { id: 5, name: "Paris", image: "https://i.ibb.co/ymNr6HXP/download.jpg", description: "The city of love and lights." },
   { id: 6, name: "New York", image: "https://i.ibb.co/WvJ9vy1M/images-2.jpg", description: "The city that never sleeps." },
   { id: 7, name: "Tokyo", image: "https://i.ibb.co/BVg6FtpC/images-1.jpg", description: "A perfect blend of tradition and modernity." },
   { id: 8, name: "Sydney", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Beautiful beaches and the iconic Opera House." },
];

export default function MostPopularDestinationSwiper() {
   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <h2 className="text-2xl font-bold mb-6 text-center">
            Most Popular Destinations
         </h2>

         <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}          // default for mobile
            loop={true}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
            coverflowEffect={{
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
            breakpoints={{
               0: { slidesPerView: 1 },
               640: { slidesPerView: 2 },   // small screens
               768: { slidesPerView: 3 },   // tablets
               1024: { slidesPerView: 4 },  // desktops
               1280: { slidesPerView: 4 },  // large desktops
            }}
         >
            {destinations.map((dest) => (
               <SwiperSlide
                  key={dest.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  style={{ width: "300px" }}
               >
                  <img
                     src={dest.image}
                     alt={dest.name}
                     className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                     <h3 className="text-lg font-semibold">{dest.name}</h3>
                     <p className="text-gray-600 mt-2">{dest.description}</p>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>


         
      </div>
   );
}
