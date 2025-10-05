

import { useEffect } from 'react';
import CountUp from 'react-countup';
import { Users, HeartHandshake, ShieldCheck } from 'lucide-react';

import 'aos/dist/aos.css';
import Aos from 'aos';

function About() {
   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   return (
      <>
         {/* Hero Section */}
         <section className="relative h-screen flex items-center justify-center overflow-hidden dark:text-white">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-r "></div>
               <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Scenic landscape"
                  className="w-full h-full object-cover"
               />
            </div>

            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto" data-aos="fade-up">
               <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">Journey Beyond Boundaries</h1>
               <p className="text-xl md:text-2xl mb-8">
                  Crafting unforgettable adventures since 2010
               </p>
               <div className="flex-col sm:flex-row justify-center gap-7 sm:gap-4 space-y-3 sm:space-x-3">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                     Explore Tours
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                     Contact Us
                  </button>
               </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
               </svg>
            </div>
         </section>

         {/* About Content Section */}
         <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div data-aos="fade-right">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6 relative pb-2 dark:text-white">
                     Our Story
                     <span className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">
                     Founded in 2010, our tour company began with a simple mission: to show travelers the authentic beauty of destinations around the world while providing exceptional service and value.
                  </p>
                  <p className="text-gray-600 mb-6 text-lg">
                     What started as a small family business has grown into a trusted travel partner for thousands of adventurers each year. Our team of experienced guides and travel experts are passionate about creating memorable experiences.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
                     <p className="text-blue-800 italic text-lg">
                        "We believe that travel has the power to change perspectives, create connections, and inspire personal growth."
                     </p>
                  </div>
               </div>
               <div className="relative" data-aos="fade-left" data-aos-delay="200">
                  <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-700">
                     <img
                        src="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80"
                        alt="Tour group enjoying an experience"
                        className="w-full h-auto object-cover"
                     />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                     <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                           <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-gray-800">150+</p>
                           <p className="text-gray-600">Destinations Worldwide</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden dark:bg-black">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full translate-y-32 -translate-x-32 opacity-50"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10 ">
               <h2 className="text-4xl font-bold text-center text-gray-800 mb-16" data-aos="fade-up">By The Numbers</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition duration-300" data-aos="fade-up" data-aos-delay="100">
                     <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                     </div>
                     <p className="text-4xl font-bold text-blue-600 mb-2">
                        <CountUp end={50} duration={3} />K+
                     </p>
                     <p className="text-gray-600 font-medium">Happy Travelers</p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition duration-300 " data-aos="fade-up" data-aos-delay="200">
                     <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex-col sm:flex-row items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                     </div>
                     <p className="text-4xl font-bold text-green-600 mb-2">
                        <CountUp end={150} duration={3} />+
                     </p>
                     <p className="text-gray-600 font-medium">Destinations</p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition duration-300 " data-aos="fade-up" data-aos-delay="300">
                     <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <p className="text-4xl font-bold text-purple-600 mb-2">
                        <CountUp end={12} duration={3} />
                     </p>
                     <p className="text-gray-600 font-medium">Years Experience</p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition duration-300" data-aos="fade-up" data-aos-delay="400">
                     <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                     </div>
                     <p className="text-4xl font-bold text-orange-600 mb-2">
                        <CountUp end={98} duration={3} />%
                     </p>
                     <p className="text-gray-600 font-medium">Satisfaction Rate</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Team Section */}
         <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
               <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">Meet Our Team</h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white">
                  Our passionate team of travel experts is dedicated to creating unforgettable experiences for you.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {/* Team Member 1 */}
               <div className="text-center bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-500 hover:shadow-xl" data-aos="flip-left">
                  <div className="relative overflow-hidden">
                     <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
                        alt="Team member"
                        className="w-full h-72 object-cover transition-transform duration-700 hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                     <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-semibold text-white">Sarah Johnson</h3>
                        <p className="text-blue-300">Founder & CEO</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <p className="text-gray-600 mb-4">With over 15 years in the travel industry, Sarah ensures every detail of your journey is perfect.</p>
                     <div className="flex justify-center space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                           </svg>
                        </a>
                     </div>
                  </div>
               </div>

               {/* Team Member 2 */}
               <div className="text-center bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-500 hover:shadow-xl" data-aos="flip-left" data-aos-delay="200">
                  <div className="relative overflow-hidden">
                     <img
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
                        alt="Team member"
                        className="w-full h-72 object-cover transition-transform duration-700 hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                     <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-semibold text-white">Michael Chen</h3>
                        <p className="text-blue-300">Head of Operations</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <p className="text-gray-600 mb-4">Michael coordinates all our tours to ensure seamless experiences from start to finish.</p>
                     <div className="flex justify-center space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                           </svg>
                        </a>
                     </div>
                  </div>
               </div>

               {/* Team Member 3 */}
               <div className="text-center bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-500 hover:shadow-xl" data-aos="flip-left" data-aos-delay="400">
                  <div className="relative overflow-hidden">
                     <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
                        alt="Team member"
                        className="w-full h-72 object-cover transition-transform duration-700 hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                     <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-semibold text-white">Elena Rodriguez</h3>
                        <p className="text-blue-300">Lead Tour Guide</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <p className="text-gray-600 mb-4">Elena's passion for history and culture brings each destination to life for our travelers.</p>
                     <div className="flex justify-center space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                           </svg>
                        </a>
                        <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                           </svg>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className="py-20 bg-gray-900/10 text-white font-sans dark:text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Title Section */}
               <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 dark:text-white">
                  Our Values
               </h2>
               {/* Values Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {/* Community Focus Card */}
                  <div className="bg-white/5 bg-gradient-to-r from-teal-400 to-cyan-500 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-105">
                     <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white mb-6 transform transition-transform duration-300 group-hover:rotate-[360deg]">
                        <Users className="h-8 w-8" strokeWidth={2.5} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Community Focus</h3>
                     <p className="text-white leading-relaxed">
                        We actively support local communities by partnering with small businesses and promoting sustainable tourism practices to ensure a positive impact.
                     </p>
                  </div>
                  {/* Passion for Travel Card */}
                  <div className="bg-white/5 bg-gradient-to-r from-teal-400 to-cyan-500 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-105">
                     <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white mb-6 transform transition-transform duration-300 group-hover:rotate-[360deg]">
                        <HeartHandshake className="h-8 w-8" strokeWidth={2.5} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Integrity & Respect</h3>
                     <p className="text-white leading-relaxed dark:text-white">
                        Our team operates with unwavering integrity, respecting every culture and environment we encounter to build trust and lasting relationships.
                     </p>
                  </div>
                  {/* Safety First Card */}
                  <div className="bg-white/5 bg-gradient-to-r from-teal-500 to-cyan-500 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-105">
                     <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white mb-6 transform transition-transform duration-300 group-hover:rotate-[360deg]">
                        <ShieldCheck className="h-8 w-8" strokeWidth={2.5} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Safety First</h3>
                     <p className="text-white leading-relaxed">
                        Your safety is our top priority. We adhere to the highest standards and are prepared for any situation to ensure a secure journey.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center relative overflow-hidden font-sans">
            {/* Background shapes for visual interest */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
               <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                  Ready to Explore With Us? 
               </h2>
               <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
                  Join thousands of satisfied travelers who have experienced the world through our carefully crafted tours and personalized adventures.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <button className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl">
                     Browse Our Tours
                  </button>
                  <button className="border-2 border-white text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl">
                     Contact Us
                  </button>
               </div>
            </div>
         </section>
      </>
   );
}

export default About;