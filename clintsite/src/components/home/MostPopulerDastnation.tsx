
// Example data for destinations
const destinations = [
   {
      id: 1,
      name: "Paris",
      image: "https://source.unsplash.com/400x300/?paris",
      description: "The city of love and lights.",
   },
   {
      id: 2,
      name: "New York",
      image: "https://source.unsplash.com/400x300/?newyork",
      description: "The city that never sleeps.",
   },
   {
      id: 3,
      name: "Tokyo",
      image: "https://source.unsplash.com/400x300/?tokyo",
      description: "A perfect blend of tradition and modernity.",
   },
   {
      id: 4,
      name: "Sydney",
      image: "https://source.unsplash.com/400x300/?sydney",
      description: "Beautiful beaches and the iconic Opera House.",
   },
];

function MostPopulerDastnation() {
   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <h2 className="text-2xl font-bold mb-6 text-center">Most Popular Destinations</h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
               <div
                  key={dest.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
               </div>
            ))}
         </div>
      </div>
   );
}

export default MostPopulerDastnation;
