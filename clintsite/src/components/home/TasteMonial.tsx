function Testimonials() {
   return (
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Traveler <span className="text-blue-600">Testimonials</span>
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  See what our travelers have to say about their experiences exploring the beautiful landscapes of Bangladesh.
               </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Testimonial 1 */}
               <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                     <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                        alt="Rahim Ahmed"
                        className="w-12 h-12 rounded-full object-cover"
                     />
                     <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">রহিম আহমেদ</h3>
                        <p className="text-sm text-gray-500">সিলেট ভ্রমণ, ডিসেম্বর ২০২৩</p>
                     </div>
                  </div>
                  <div className="flex mb-4">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                           key={star}
                           className="w-5 h-5 text-yellow-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
                  <p className="text-gray-600 mb-2">
                     "সিলেটের চা বাগান এবং জাফলং এর প্রাকৃতিক সৌন্দর্য্য আমাকে মুগ্ধ করেছে। গাইডটি খুব ভালো এবং সহায়ক ছিল।"
                  </p>
                  <p className="text-gray-600">
                     "The tea gardens of Sylhet and the natural beauty of Jaflong amazed me. The guide was very good and helpful."
                  </p>
               </div>

               {/* Testimonial 2 */}
               <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                     <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                        alt="Fatima Begum"
                        className="w-12 h-12 rounded-full object-cover"
                     />
                     <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">ফাতিমা বেগম</h3>
                        <p className="text-sm text-gray-500">সেন্টমার্টিন ভ্রমণ, নভেম্বর ২০২৩</p>
                     </div>
                  </div>
                  <div className="flex mb-4">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                           key={star}
                           className="w-5 h-5 text-yellow-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
                  <p className="text-gray-600 mb-2">
                     "সেন্টমার্টিন দ্বীপের সৈকত এবং প্রবাল প্রাচীর অসাধারণ ছিল। এই ভ্রমণ আমার জীবনের সেরা অভিজ্ঞতা।"
                  </p>
                  <p className="text-gray-600">
                     "The beaches and coral reefs of Saint Martin's Island were amazing. This trip was the best experience of my life."
                  </p>
               </div>

               {/* Testimonial 3 */}
               <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                     <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                        alt="Jamal Hossain"
                        className="w-12 h-12 rounded-full object-cover"
                     />
                     <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">জামাল হোসেন</h3>
                        <p className="text-sm text-gray-500">সুন্দরবন ভ্রমণ, জানুয়ারি ২০২৪</p>
                     </div>
                  </div>
                  <div className="flex mb-4">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                           key={star}
                           className="w-5 h-5 text-yellow-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
                  <p className="text-gray-600 mb-2">
                     "সুন্দরবনের বন্যপ্রাণী এবং ম্যানগ্রোভ বন দেখে আমি অভিভূত। আমাদের নিরাপত্তা এবং সুবিধাগুলো খুব ভালো ছিল।"
                  </p>
                  <p className="text-gray-600">
                     "I was amazed by the wildlife and mangrove forests of the Sundarbans. Our safety and amenities were excellent."
                  </p>
               </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
               <button className="w-3 h-3 rounded-full bg-blue-600"></button>
               <button className="w-3 h-3 rounded-full bg-gray-300"></button>
               <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            </div>
         </div>
      </section>
   );
}

export default Testimonials;