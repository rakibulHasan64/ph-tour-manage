/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import {
   Star, Quote, MapPin, Calendar, Heart, ChevronLeft,
   ChevronRight, Play, Pause, Sparkles, Award, Users,
   ThumbsUp, Share2, MessageCircle
} from 'lucide-react';
import Aos from 'aos';

function Testimonials() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(true);
   const [liked, setLiked] = useState<number[]>([]);
   const [shared, setShared] = useState<number[]>([]);
   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
   const sliderRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      Aos.init({
         duration: 1200,
         once: true,
         easing: 'ease-out-cubic'
      });
   }, []);

   useEffect(() => {
      if (isPlaying) {
         autoPlayRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % testimonials.length);
         }, 5000);
      }

      return () => {
         if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
         }
      };
   }, [isPlaying]);


   const toggleLike = (id: number) => {
      setLiked(prev =>
         prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
      );
   };

   const toggleShare = (id: number) => {
      setShared(prev =>
         prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
      );
   };

   const nextSlide = () => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
      resetAutoPlay();
   };

   const prevSlide = () => {
      setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      resetAutoPlay();
   };

   const resetAutoPlay = () => {
      if (autoPlayRef.current) {
         clearInterval(autoPlayRef.current);
      }

      if (isPlaying) {
         autoPlayRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % testimonials.length);
         }, 5000);
      }
   };


   const testimonials = [
      {
         id: 1,
         name: "রহিম আহমেদ",
         location: "সিলেট ভ্রমণ",
         date: "ডিসেম্বর ২০২৩",
         rating: 5,
         image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
         banglaText: "সিলেটের চা বাগান এবং জাফলং এর প্রাকৃতিক সৌন্দর্য্য আমাকে মুগ্ধ করেছে। গাইডটি খুব ভালো এবং সহায়ক ছিল।",
         englishText: "The tea gardens of Sylhet and the natural beauty of Jaflong amazed me. The guide was very good and helpful.",
         likes: 24,
         shares: 8,
         color: "from-emerald-500 to-green-600",
         bgColor: "bg-gradient-to-br from-emerald-50/90 to-green-100/90",
         accent: "emerald",
         badge: "প্রথম ভ্রমণ"
      },
      {
         id: 2,
         name: "ফাতিমা বেগম",
         location: "সেন্টমার্টিন ভ্রমণ",
         date: "নভেম্বর ২০২৩",
         rating: 5,
         image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
         banglaText: "সেন্টমার্টিন দ্বীপের সৈকত এবং প্রবাল প্রাচীর অসাধারণ ছিল। এই ভ্রমণ আমার জীবনের সেরা অভিজ্ঞতা।",
         englishText: "The beaches and coral reefs of Saint Martin's Island were amazing. This trip was the best experience of my life.",
         likes: 31,
         shares: 12,
         color: "from-blue-500 to-cyan-600",
         bgColor: "bg-gradient-to-br from-blue-50/90 to-cyan-100/90",
         accent: "blue",
         badge: "শীর্ষ রেটেড"
      },
      {
         id: 3,
         name: "জামাল হোসেন",
         location: "সুন্দরবন ভ্রমণ",
         date: "জানুয়ারি ২০২৪",
         rating: 5,
         image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
         banglaText: "সুন্দরবনের বন্যপ্রাণী এবং ম্যানগ্রোভ বন দেখে আমি অভিভূত। আমাদের নিরাপত্তা এবং সুবিধাগুলো খুব ভালো ছিল।",
         englishText: "I was amazed by the wildlife and mangrove forests of the Sundarbans. Our safety and amenities were excellent.",
         likes: 19,
         shares: 6,
         color: "from-orange-500 to-amber-600",
         bgColor: "bg-gradient-to-br from-orange-50/90 to-amber-100/90",
         accent: "orange",
         badge: "বন্যপ্রাণী বিশেষ"
      },
      {
         id: 4,
         name: "আয়শা সিদ্দিকা",
         location: "কক্সবাজার ভ্রমণ",
         date: "ফেব্রুয়ারি ২০২৪",
         rating: 5,
         image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
         banglaText: "বিশ্বের দীর্ঘতম প্রাকৃতিক সৈকতের সৌন্দর্য্য অসাধারণ! সূর্যাস্তের দৃশ্য আমি কখনো ভুলবো না।",
         englishText: "The beauty of the world's longest natural beach is extraordinary! I will never forget the sunset views.",
         likes: 42,
         shares: 15,
         color: "from-purple-500 to-pink-600",
         bgColor: "bg-gradient-to-br from-purple-50/90 to-pink-100/90",
         accent: "purple",
         badge: "সৈকত প্রেমী"
      },
      {
         id: 5,
         name: "সজীব ইসলাম",
         location: "বান্দরবান ভ্রমণ",
         date: "মার্চ ২০২৪",
         rating: 5,
         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
         banglaText: "নীলগিরি এবং নীলাচলের প্রাকৃতিক সৌন্দর্য্য এবং আদিবাসী সংস্কৃতি সম্পর্কে জানতে পেরে খুব ভালো লাগলো।",
         englishText: "Loved learning about the natural beauty of Nilgiri and Nilachol and the indigenous culture.",
         likes: 27,
         shares: 9,
         color: "from-indigo-500 to-violet-600",
         bgColor: "bg-gradient-to-br from-indigo-50/90 to-violet-100/90",
         accent: "indigo",
         badge: "সংস্কৃতি অন্বেষণ"
      }
   ];



   const getSlideStyle = (position: string, accent: string) => {
      const baseStyle = "absolute transition-all duration-1000 ease-out transform-gpu cursor-pointer";
      const shadowStyle = "shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl";

      // Mobile styles (default)
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
         switch (position) {
            case 'center':
               return `${baseStyle} ${shadowStyle} scale-100 opacity-100 z-50 left-1/2 -translate-x-1/2 glow-${accent}-mobile`;
            case 'right-1':
               return `${baseStyle} ${shadowStyle} scale-90 opacity-60 z-40 left-3/4 -translate-x-1/2 translate-z-20`;
            case 'right-2':
               return `${baseStyle} scale-80 opacity-30 z-30 left-full -translate-x-3/4 translate-z-10`;
            case 'left-1':
               return `${baseStyle} ${shadowStyle} scale-90 opacity-60 z-40 left-1/4 -translate-x-1/2 translate-z-20`;
            case 'left-2':
               return `${baseStyle} scale-80 opacity-30 z-30 left-0 translate-x-1/4 translate-z-10`;
            default:
               return `${baseStyle} scale-50 opacity-0 z-0`;
         }
      }

      // Desktop styles
      switch (position) {
         case 'center':
            return `${baseStyle} ${shadowStyle} scale-100 sm:scale-110 rotate-y-0 opacity-100 z-50 left-1/2 -translate-x-1/2 glow-${accent}`;
         case 'right-1':
            return `${baseStyle} ${shadowStyle} scale-90 sm:scale-95 rotate-y-30 sm:rotate-y-45 opacity-80 sm:opacity-90 z-40 left-[65%] sm:left-[70%] -translate-x-1/2 translate-z-40 sm:translate-z-80`;
         case 'right-2':
            return `${baseStyle} ${shadowStyle} scale-80 sm:scale-85 rotate-y-50 sm:rotate-y-75 opacity-50 sm:opacity-70 z-30 left-[80%] sm:left-[85%] -translate-x-1/2 translate-z-20 sm:translate-z-40`;
         case 'left-1':
            return `${baseStyle} ${shadowStyle} scale-90 sm:scale-95 -rotate-y-30 sm:-rotate-y-45 opacity-80 sm:opacity-90 z-40 left-[35%] sm:left-[30%] -translate-x-1/2 translate-z-40 sm:translate-z-80`;
         case 'left-2':
            return `${baseStyle} ${shadowStyle} scale-80 sm:scale-85 -rotate-y-50 sm:-rotate-y-75 opacity-50 sm:opacity-70 z-30 left-[20%] sm:left-[15%] -translate-x-1/2 translate-z-20 sm:translate-z-40`;
         default:
            return `${baseStyle} scale-50 opacity-0 z-0`;
      }
   };

   const getSlidePosition = (index: number) => {
      const total = testimonials.length;
      const diff = (index - activeIndex + total) % total;

      if (diff === 0) return 'center';
      if (diff === 1) return 'right-1';
      if (diff === 2) return 'right-2';
      if (diff === total - 1) return 'left-1';
      if (diff === total - 2) return 'left-2';
      return 'hidden';
   };

   return (
      <section className="relative min-h-screen py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-1/4 right-0 w-128 h-128 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
            <div className="absolute bottom-0 left-1/4 w-144 h-144 bg-blue-500/10 rounded-full blur-3xl animate-float-slow delay-2000"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
         </div>

         {/* Animated Grid Pattern */}
         <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></div>
         </div>

         {/* Floating Particles */}
         <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
               <div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full animate-float-particle ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-yellow-400'}`}
                  style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 10}s`,
                     animationDuration: `${15 + Math.random() * 20}s`
                  }}
               />
            ))}
         </div>

         {/* Sparkles */}
         <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
               <Sparkles
                  key={i}
                  className={`absolute w-4 h-4 animate-sparkle ${i % 4 === 0 ? 'text-cyan-400' : i % 4 === 1 ? 'text-pink-400' : i % 4 === 2 ? 'text-yellow-400' : 'text-purple-400'}`}
                  style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 5}s`
                  }}
               />
            ))}
         </div>

         <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div
               className="text-center mb-16 sm:mb-20"
               data-aos="fade-down"
               data-aos-delay="200"
            >
               <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border border-white/20 mb-6 sm:mb-8 shadow-2xl">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" />
                  <span className="text-base sm:text-lg font-bold text-white">
                     বাংলাদেশের সেরা ট্যুর অপারেটর ২০২৪
                  </span>
               </div>

               <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                     আমাদের গর্ব
                  </span>
                  <br />
                  <span className="text-white">ভ্রমণকারীদের কথা</span>
               </h2>

               <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl md:max-w-4xl mx-auto leading-relaxed font-light mb-6">
                  বাংলাদেশের অপরূপ সৌন্দর্য্য সম্পর্কে সরাসরি অভিজ্ঞতা শুনুন আমাদের
                  ভ্রমণকারীদের কাছ থেকে
               </p>
            </div>

            {/* 3D Slider Container */}
            <div className="relative mt-28 md:mt-10 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] mb-12 md:mb-20"
               data-aos="zoom-in"
               data-aos-delay="400"
               ref={sliderRef}>

               {/* Slider Track */}
               <div className="relative w-full h-full flex items-center justify-center">
                  {testimonials.map((testimonial, index) => {
                     const position = getSlidePosition(index);
                     return (
                        <div
                           key={testimonial.id}
                           className={`${getSlideStyle(position, testimonial.accent)} w-[90%] sm:w-[85%] md:w-[80%] lg:max-w-4xl ${testimonial.bgColor} rounded-3xl lg:rounded-4xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/20`}
                           onClick={() => position !== 'center' && setActiveIndex(index)}
                        >
                           {/* Animated Gradient Border */}
                           <div className={`h-2 bg-gradient-to-r ${testimonial.color} animate-gradient-x`}></div>

                           <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                              {/* Header with Badge */}
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
                                 <div className="flex items-center gap-3 sm:gap-4">
                                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-gray-400/60 transform -scale-x-100 animate-float-slow" />
                                    <div className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${testimonial.color} rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm font-bold shadow-lg`}>
                                       {testimonial.badge}
                                    </div>
                                 </div>

                                 {/* Social Actions */}
                                 <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                                    <button
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          toggleLike(testimonial.id);
                                       }}
                                       className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-300"
                                    >
                                       <div className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-110 ${liked.includes(testimonial.id)
                                             ? 'bg-red-500 text-white animate-heartbeat'
                                             : 'bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-red-500'
                                          }`}>
                                          <Heart
                                             className={`w-4 h-4 sm:w-5 sm:h-5 ${liked.includes(testimonial.id) ? 'fill-current' : ''}`}
                                          />
                                       </div>
                                       <span className={`font-bold ${liked.includes(testimonial.id) ? 'text-red-500' : 'text-gray-600'}`}>
                                          {testimonial.likes + (liked.includes(testimonial.id) ? 1 : 0)}
                                       </span>
                                    </button>

                                    <button
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          toggleShare(testimonial.id);
                                       }}
                                       className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-300"
                                    >
                                       <div className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-110 ${shared.includes(testimonial.id)
                                             ? 'bg-blue-500 text-white'
                                             : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
                                          }`}>
                                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                       </div>
                                       <span className={`font-bold ${shared.includes(testimonial.id) ? 'text-blue-500' : 'text-gray-600'}`}>
                                          {testimonial.shares + (shared.includes(testimonial.id) ? 1 : 0)}
                                       </span>
                                    </button>
                                 </div>
                              </div>

                              {/* Rating Stars */}
                              <div className="flex items-center mb-4  sm:mb-6 md:mb-8">
                                 <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                       <Star
                                          key={i}
                                          className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-1 transition-all duration-500 ${i < testimonial.rating
                                                ? 'text-yellow-400 fill-current animate-pulse'
                                                : 'text-gray-300'
                                             }`}
                                          style={{ animationDelay: `${i * 100}ms` }}
                                       />
                                    ))}
                                 </div>
                                 <span className="ml-3 sm:ml-4 text-lg sm:text-xl lg:text-2xl font-black text-gray-700">
                                    {testimonial.rating}.0
                                 </span>
                              </div>

                              {/* Testimonial Text */}
                              <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8">
                                 <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-800 font-medium italic">
                                    "{testimonial.banglaText}"
                                 </p>
                                 <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-600 font-light italic">
                                    "{testimonial.englishText}"
                                 </p>
                              </div>

                              {/* User Info */}
                              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200/50">
                                 <div className="relative">
                                    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl sm:rounded-3xl blur opacity-75 animate-pulse"></div>
                                    <img
                                       src={testimonial.image}
                                       alt={testimonial.name}
                                       className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl object-cover border-2 sm:border-4 border-white shadow-lg"
                                    />
                                    <div className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-gradient-to-r ${testimonial.color} border-2 border-white flex items-center justify-center`}>
                                       <ThumbsUp className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" />
                                    </div>
                                 </div>
                                 <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-bold sm:font-black text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-800 mb-1 sm:mb-2">
                                       {testimonial.name}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 lg:gap-6 text-sm sm:text-base lg:text-lg text-gray-600">
                                       <div className="flex items-center gap-1 sm:gap-2">
                                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" />
                                          <span className="font-medium sm:font-semibold">{testimonial.location}</span>
                                       </div>
                                       <div className="flex items-center gap-1 sm:gap-2">
                                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-500" />
                                          <span className="font-medium sm:font-semibold">{testimonial.date}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-400 hidden sm:block" />
                              </div>
                           </div>

                           {/* Active Slide Glow Effect */}
                           {position === 'center' && (
                              <>
                                 <div className="absolute inset-0 rounded-3xl lg:rounded-4xl border-2 sm:border-4 border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.3)] lg:shadow-[0_0_80px_rgba(34,211,238,0.4)] pointer-events-none animate-pulse"></div>
                                 <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-3xl lg:rounded-4xl blur-lg sm:blur-xl pointer-events-none animate-glow"></div>
                              </>
                           )}
                        </div>
                     );
                  })}
               </div>

               {/* Enhanced Navigation Arrows */}
               <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-500 transform hover:scale-110 hover:-translate-x-1 sm:hover:-translate-x-2 z-50 border border-white/30 shadow-lg sm:shadow-2xl group"
               >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
               </button>

               <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-500 transform hover:scale-110 hover:translate-x-1 sm:hover:translate-x-2 z-50 border border-white/30 shadow-lg sm:shadow-2xl group"
               >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
               </button>

               {/* Enhanced Play/Pause Button */}
               <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-500 transform hover:scale-110 z-50 border border-white/30 shadow-lg sm:shadow-2xl group"
               >
                  {isPlaying ?
                     <Pause className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" /> :
                     <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                  }
               </button>
            </div>

            {/* Navigation Dots */}
            <div
               className="flex justify-center space-x-3 sm:space-x-4 mb-12 sm:mb-16"
               data-aos="fade-up"
               data-aos-delay="600"
            >
               {testimonials.map((testimonial, index) => (
                  <button
                     key={testimonial.id}
                     onClick={() => setActiveIndex(index)}
                     className={`relative transition-all duration-500 ${activeIndex === index ? "scale-125" : "hover:scale-110"
                        }`}
                  >
                     <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${activeIndex === index
                              ? `bg-gradient-to-r ${testimonial.color} shadow-lg`
                              : "bg-white/30 hover:bg-white/50"
                           }`}
                     ></div>
                  </button>
               ))}
            </div>

            {/* Stats Section */}
            <div
               className="grid grid-cols-2 sm:grid-cols-2 mt-14 md:mt-8 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20"
               data-aos="fade-up"
               data-aos-delay="800"
            >
               {[
                  {
                     number: "10,000+",
                     label: "সন্তুষ্ট ভ্রমণকারী",
                     color: "from-green-400 to-emerald-500",
                     icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                  },
                  {
                     number: "4.9/5",
                     label: "গড় রেটিং",
                     color: "from-yellow-400 to-amber-500",
                     icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />,
                  },
                  {
                     number: "99%",
                     label: "সুপারিশ হার",
                     color: "from-blue-400 to-cyan-500",
                     icon: <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />,
                  },
                  {
                     number: "200+",
                     label: "ট্যুর সম্পন্ন",
                     color: "from-purple-400 to-pink-500",
                     icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
                  },
               ].map((stat, index) => (
                  <div
                     key={index}
                     className="group text-center bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                  >
                     <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                     </div>
                     <div
                        className={`text-2xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}
                     >
                        {stat.number}
                     </div>
                     <div className="text-gray-300 font-semibold text-base sm:text-lg">
                        {stat.label}
                     </div>
                  </div>
               ))}
            </div>

            {/* CTA Section */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="1000">
               <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl sm:rounded-4xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                  <div className="bg-gradient-to-r from-slate-900/95 to-gray-900/95 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
                     {/* Animated Background */}
                     <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-x"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
                     </div>

                     <div className="relative z-10">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
                           আপনার{" "}
                           <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              গল্পটি
                           </span>{" "}
                           শেয়ার করুন
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                           আমাদের ভ্রমণ কমিউনিটির অংশ হন এবং আপনার অভিজ্ঞতা দিয়ে অন্য
                           ভ্রমণপিপাসুদের অনুপ্রাণিত করুন
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                           <button className="group px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black text-base sm:text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center gap-3 sm:gap-4">
                              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                              <span>রিভিউ লিখুন</span>
                           </button>

                           <button className="group px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-black text-sm sm:text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center gap-3 sm:gap-4">
                              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                              <span>গ্যালারি দেখুন</span>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Enhanced Custom Animations */}
         <style>{`
            @keyframes float-slow {
               0%, 100% { transform: translateY(0px) rotate(0deg); }
               50% { transform: translateY(-30px) rotate(180deg); }
            }
            @keyframes float-medium {
               0%, 100% { transform: translateY(0px) scale(1); }
               50% { transform: translateY(-20px) scale(1.1); }
            }
            @keyframes float-fast {
               0%, 100% { transform: translateY(0px); }
               50% { transform: translateY(-10px); }
            }
            @keyframes float-particle {
               0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
               10% { opacity: 1; }
               50% { transform: translate(100px, -100px) rotate(180deg); }
               100% { transform: translate(0, 0) rotate(360deg); opacity: 0; }
            }
            @keyframes sparkle {
               0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
               50% { opacity: 1; transform: scale(1) rotate(180deg); }
            }
            @keyframes shimmer {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(100%); }
            }
            @keyframes gradient-x {
               0%, 100% { background-position: 0% 50%; }
               50% { background-position: 100% 50%; }
            }
            @keyframes glow {
               0%, 100% { opacity: 0.5; }
               50% { opacity: 0.8; }
            }
            @keyframes heartbeat {
               0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
            .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
            .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
            .animate-float-particle { animation: float-particle 20s linear infinite; }
            .animate-sparkle { animation: sparkle 4s ease-in-out infinite; }
            .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
            .animate-gradient-x { 
               background-size: 200% 200%;
               animation: gradient-x 3s ease infinite; 
            }
            .animate-glow { animation: glow 2s ease-in-out infinite; }
            .animate-heartbeat { animation: heartbeat 0.5s ease-in-out; }

            .perspective-2000 { perspective: 2000px; }
            .rotate-y-45 { transform: rotateY(45deg); }
            .-rotate-y-45 { transform: rotateY(-45deg); }
            .rotate-y-75 { transform: rotateY(75deg); }
            .-rotate-y-75 { transform: rotateY(-75deg); }
            .translate-z-80 { transform: translateZ(80px); }
            .translate-z-40 { transform: translateZ(40px); }

            .glow-emerald { box-shadow: 0 0 60px rgba(16, 185, 129, 0.3); }
            .glow-blue { box-shadow: 0 0 60px rgba(59, 130, 246, 0.3); }
            .glow-orange { box-shadow: 0 0 60px rgba(249, 115, 22, 0.3); }
            .glow-purple { box-shadow: 0 0 60px rgba(168, 85, 247, 0.3); }
            .glow-indigo { box-shadow: 0 0 60px rgba(99, 102, 241, 0.3); }

            .rounded-4xl { border-radius: 2.5rem; }

            .slide-right-1 { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
            .slide-right-2 { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 50ms; }
            .slide-left-1 { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
            .slide-left-2 { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 50ms; }

            .transform-gpu { transform: translate3d(0, 0, 0); }
         `}</style>
      </section>
   );
}

export default Testimonials;