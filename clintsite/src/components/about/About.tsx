import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { Users, HeartHandshake, ShieldCheck, MapPin, Clock, Star, Award, Globe } from 'lucide-react';

import 'aos/dist/aos.css';
import Aos from 'aos';

function About() {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   // Animated Background Effect
   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const resizeCanvas = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Particle system for animated background
      class Particle {
         x: number;
         y: number;
         size: number;
         speedX: number;
         speedY: number;
         color: string;
         alpha: number;
         canvas: HTMLCanvasElement;

         constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)},`;
            this.alpha = Math.random() * 0.6 + 0.2;
         }

         update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > this.canvas.width) this.x = 0;
            else if (this.x < 0) this.x = this.canvas.width;
            if (this.y > this.canvas.height) this.y = 0;
            else if (this.y < 0) this.y = this.canvas.height;
         }

         draw(ctx: CanvasRenderingContext2D) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
         }
      }

      const particles: Particle[] = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;

      for (let i = 0; i < particleCount; i++) {
         particles.push(new Particle(canvas));
      }

      // Animation loop
      const animate = () => {
         ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
         ctx.fillRect(0, 0, canvas.width, canvas.height);

         particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
         });

         requestAnimationFrame(animate);
      };

      animate();

      return () => {
         window.removeEventListener('resize', resizeCanvas);
      };
   }, []);

   return (
      <>
         {/* Modern Hero Section */}
         <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
            {/* Animated Canvas Background */}
            <canvas
               ref={canvasRef}
               className="absolute inset-0 w-full h-full"
            />

            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-black/40"></div>
               <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
               <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

               {/* Floating Elements */}
               {[...Array(8)].map((_, index) => (
                  <div
                     key={index}
                     className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                     style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${15 + Math.random() * 10}s`
                     }}
                  ></div>
               ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto" data-aos="fade-up">
               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-sm font-medium">Trusted by 50,000+ Travelers Worldwide</span>
               </div>

               <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Explore The{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                     World
                  </span>
               </h1>

               <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light max-w-4xl mx-auto leading-relaxed">
                  Crafting <span className="text-cyan-400 font-semibold">unforgettable journeys</span> and creating memories that last a lifetime since 2010
               </p>

               <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                  <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 lg:py-4 lg:px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/25 flex items-center gap-3 text-sm lg:text-base">
                     <span>Discover Tours</span>
                     <svg className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </button>

                  <button className="group border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold py-3 px-6 lg:py-4 lg:px-8 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-sm lg:text-base">
                     <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <span>Watch Story</span>
                  </button>
               </div>

               {/* Stats Bar */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-2xl mx-auto">
                  {[
                     { number: '50K+', label: 'Happy Travelers' },
                     { number: '150+', label: 'Destinations' },
                     { number: '12+', label: 'Years Experience' },
                     { number: '98%', label: 'Satisfaction' }
                  ].map((stat, index) => (
                     <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-400">{stat.number}</div>
                        <div className="text-xs lg:text-sm text-white/80 mt-1">{stat.label}</div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
               <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
               </div>
            </div>
         </section>

         {/* About Story Section */}
         <div className=" bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900">
            <section className="py-16 lg:py-20 px-4 md:px-8 max-w-7xl mx-auto  overflow-hidden">
               {/* Animated Background Elements */}
               <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-900/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>

                  {/* Floating Elements */}
                  {[...Array(8)].map((_, index) => (
                     <div
                        key={index}
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
                        style={{
                           top: `${Math.random() * 100}%`,
                           left: `${Math.random() * 100}%`,
                           animationDelay: `${Math.random() * 5}s`,
                           animationDuration: `${20 + Math.random() * 10}s`
                        }}
                     ></div>
                  ))}
               </div>

               <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                  {/* Content */}
                  <div data-aos="fade-right" data-aos-delay="200">
                     <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 ">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Our Journey Begins
                     </div>

                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 dark:text-white leading-tight">
                        Discover The{' '}
                        <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                           Magic of Travel
                        </span>
                     </h2>

                     <p className="text-base lg:text-lg text-white mb-6 leading-relaxed bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                        Since 2010, we've been crafting extraordinary journeys that transform ordinary trips into lifelong memories. From humble beginnings as travel enthusiasts to becoming global adventure curators.
                     </p>

                     <p className="text-base lg:text-lg text-white mb-8 dark:text-gray-300 leading-relaxed bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                        Our mission goes beyond tourism - we create authentic connections between travelers and local cultures while championing sustainable practices that preserve our planet's natural wonders.
                     </p>

                     {/* Enhanced Features */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
                        {[
                           { icon: Award, text: 'Award Winning Excellence', color: 'from-yellow-400 to-orange-500' },
                           { icon: Globe, text: 'Global Destinations', color: 'from-green-400 to-teal-500' },
                           { icon: Users, text: 'Expert Local Guides', color: 'from-blue-400 to-cyan-500' },
                           { icon: ShieldCheck, text: 'Premium Safety', color: 'from-purple-400 to-pink-500' }
                        ].map((feature, index) => (
                           <div
                              key={index}
                              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-gray-700/50 hover:border-cyan-300/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
                              data-aos="zoom-in"
                              data-aos-delay={index * 100 + 400}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                 </div>
                                 <span className="font-bold text-gray-700 dark:text-gray-300 text-sm lg:text-base">{feature.text}</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3">
                        <span>Explore Our Story</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                     </button>
                  </div>

                  {/* Enhanced Image Gallery */}
                  <div className="relative" data-aos="fade-left" data-aos-delay="400">
                     <div className="grid grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-4 lg:space-y-6">
                           <div
                              className="relative group overflow-hidden rounded-3xl shadow-2xl"
                              data-aos="zoom-in"
                              data-aos-delay="600"
                           >
                              <img
                                 src="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
                                 alt="Adventure travel"
                                 className="w-full h-32 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                           <div
                              className="relative group overflow-hidden rounded-3xl shadow-2xl"
                              data-aos="zoom-in"
                              data-aos-delay="800"
                           >
                              <img
                                 src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
                                 alt="Mountain hiking"
                                 className="w-full h-40 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                        </div>
                        <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-12">
                           <div
                              className="relative group overflow-hidden rounded-3xl shadow-2xl"
                              data-aos="zoom-in"
                              data-aos-delay="700"
                           >
                              <img
                                 src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
                                 alt="Nature landscape"
                                 className="w-full h-40 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                           <div
                              className="relative group overflow-hidden rounded-3xl shadow-2xl"
                              data-aos="zoom-in"
                              data-aos-delay="900"
                           >
                              <img
                                 src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
                                 alt="Beach vacation"
                                 className="w-full h-32 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                        </div>
                     </div>

                     {/* Enhanced Floating Card */}
                     <div
                        className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 lg:p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform duration-300"
                        data-aos="fade-up"
                        data-aos-delay="1000"
                     >
                        <div className="flex items-center gap-3 lg:gap-4">
                           <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                           </div>
                           <div>
                              <p className="text-xl lg:text-2xl font-black text-gray-800 dark:text-white bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text">150+</p>
                              <p className="text-gray-600 dark:text-gray-300 font-bold text-sm lg:text-base">Global Destinations</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Enhanced Stats Section */}
         <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
               <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
               <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

               {/* Floating Stars */}
               {[...Array(12)].map((_, index) => (
                  <div
                     key={index}
                     className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
                     style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                     }}
                  ></div>
               ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-6">
                     <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                     <span className="text-white font-bold">Why We're Different</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                     Trusted By{' '}
                     <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Travelers Worldwide
                     </span>
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
                     Experience the difference with numbers that speak for themselves
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {[
                     {
                        icon: Users,
                        number: 50,
                        suffix: 'K+',
                        label: 'Happy Travelers',
                        color: 'from-cyan-400 to-blue-500',
                        delay: 100
                     },
                     {
                        icon: MapPin,
                        number: 150,
                        suffix: '+',
                        label: 'Destinations',
                        color: 'from-green-400 to-teal-500',
                        delay: 200
                     },
                     {
                        icon: Clock,
                        number: 12,
                        suffix: '+',
                        label: 'Years Experience',
                        color: 'from-purple-400 to-pink-500',
                        delay: 300
                     },
                     {
                        icon: Star,
                        number: 98,
                        suffix: '%',
                        label: 'Satisfaction Rate',
                        color: 'from-yellow-400 to-orange-500',
                        delay: 400
                     }
                  ].map((stat, index) => (
                     <div
                        key={index}
                        className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                        data-aos="fade-up"
                        data-aos-delay={stat.delay}
                     >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                        <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}>
                           <stat.icon className={`w-8 h-8 lg:w-10 lg:h-10 text-white`} />
                        </div>
                        <p className="text-2xl lg:text-4xl font-black text-white mb-2 text-center">
                           <CountUp end={stat.number} duration={3} />{stat.suffix}
                        </p>
                        <p className="text-gray-300 font-bold text-sm lg:text-base text-center">{stat.label}</p>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                     </div>
                  ))}
               </div>

               {/* CTA Banner */}
               <div
                  className="mt-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
                  data-aos="fade-up"
                  data-aos-delay="500"
               >
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                     Ready to Start Your Journey?
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                     Join thousands of satisfied travelers and discover why we're the preferred choice for unforgettable adventures.
                  </p>
                  <button className="bg-white text-cyan-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                     Start Exploring Now
                  </button>
               </div>
            </div>
         </section>


         {/* Team Section */}
         <div className="py-16 lg:py-20 px-4   bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative overflow-hidden">
            <section className="max-w-7xl mx-auto">
               {/* Animated Background Elements */}
               <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-900/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>

                  {/* Floating Elements */}
                  {[...Array(26)].map((_, index) => (
                     <div
                        key={index}
                        className="absolute w-2 h-2 bg-blue-500 shadow shadow-white rounded-full"
                        style={{
                           top: `${Math.random() * 100}%`,
                           left: `${Math.random() * 100}%`,
                           animationDelay: `${Math.random() * 5}s`,
                           animationDuration: `${20 + Math.random() * 10}s`
                        }}
                     ></div>
                  ))}
               </div>

            
               <div className="relative z-10">
                  <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
                     <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Our Dream Team
                     </div>

                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
                        Meet The{' '}
                        <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                           Visionaries
                        </span>
                     </h2>
                     <p className="text-lg lg:text-xl text-white  max-w-3xl mx-auto dark:text-gray-300 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl p-6">
                        Passionate experts dedicated to crafting your perfect adventure with unmatched expertise and personalized care.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                     {[
                        {
                           name: "Sarah Johnson",
                           role: "Founder & CEO",
                           image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
                           bio: "15+ years transforming travel dreams into reality with unmatched expertise and visionary leadership.",
                           social: ["facebook", "twitter", "linkedin"],
                           color: "from-cyan-500 to-blue-600"
                        },
                        {
                           name: "Michael Chen",
                           role: "Head of Operations",
                           image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
                           bio: "Ensures every journey is seamless from booking to homecoming with meticulous attention to detail.",
                           social: ["facebook", "twitter", "linkedin"],
                           color: "from-green-500 to-teal-600"
                        },
                        {
                           name: "Elena Rodriguez",
                           role: "Lead Tour Guide",
                           image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
                           bio: "Brings destinations to life with captivating stories and deep local insights that create unforgettable experiences.",
                           social: ["facebook", "twitter", "linkedin"],
                           color: "from-purple-500 to-pink-600"
                        }
                     ].map((member, index) => (
                        <div
                           key={index}
                           className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 border border-white/50 dark:border-gray-700/50"
                           data-aos="zoom-in-up"
                           data-aos-delay={index * 200}
                        >
                           {/* Background Gradient Effect */}
                           <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                           {/* Image Container */}
                           <div className="relative overflow-hidden">
                              <img
                                 src={member.image}
                                 alt={member.name}
                                 className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                              {/* Role Badge */}
                              <div className="absolute top-4 right-4">
                                 <span className={`bg-gradient-to-r ${member.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                                    {member.role}
                                 </span>
                              </div>

                              {/* Name and Title */}
                              <div className="absolute bottom-4 left-4 lg:left-6">
                                 <h3 className="text-xl lg:text-2xl font-black text-white drop-shadow-lg">{member.name}</h3>
                                 <p className="text-cyan-300 font-semibold text-sm lg:text-base drop-shadow-lg">{member.role}</p>
                              </div>

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                           </div>

                           {/* Content */}
                           <div className="p-6 lg:p-8 relative">
                              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm lg:text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4">
                                 {member.bio}
                              </p>

                              {/* Social Links */}
                              <div className="flex gap-3 lg:gap-4">
                                 {member.social.map((platform, i) => (
                                    <div
                                       key={i}
                                       className="w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group/social shadow-lg"
                                    >
                                       <div className={`w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r ${member.color} rounded-lg flex items-center justify-center group-hover/social:scale-110 transition-transform duration-300`}>
                                          <span className="text-white font-bold text-xs lg:text-sm">
                                             {platform === 'facebook' ? 'f' : platform === 'twitter' ? 't' : 'in'}
                                          </span>
                                       </div>
                                    </div>
                                 ))}
                              </div>

                              {/* Decorative Element */}
                              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse">
                                 <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                              </div>
                           </div>

                           {/* Shine Effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </div>
                     ))}
                  </div>

                  {/* CTA Section */}
                  <div
                     className="mt-16 text-center"
                     data-aos="fade-up"
                     data-aos-delay="400"
                  >
                     <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-cyan-200/30 dark:border-cyan-500/20">
                        <h3 className="text-2xl lg:text-3xl font-black text-white dark:text-white mb-4">
                           Ready to Meet Your Personal Travel Expert?
                        </h3>
                        <p className="text-white dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                           Our team is here to craft the perfect journey tailored specifically for you.
                        </p>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
                           <span>Connect With Our Team</span>
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>

               <style>{`
      @keyframes float {
         0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
         }
         33% { 
            transform: translateY(-20px) translateX(10px) rotate(120deg);
         }
         66% { 
            transform: translateY(-10px) translateX(-5px) rotate(240deg);
         }
      }
      @keyframes gradient {
         0% { background-position: 0% 50%; }
         50% { background-position: 100% 50%; }
         100% { background-position: 0% 50%; }
      }
      .animate-float {
         animation: float 20s ease-in-out infinite;
      }
      .animate-gradient {
         background-size: 200% 200%;
         animation: gradient 3s ease infinite;
      }
   `}</style>
            </section>


         </div>

         {/* Values Section */}
         <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
            <div className="absolute inset-0">
               <div className="absolute top-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                     Our Core{' '}
                     <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Values
                     </span>
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
                     The principles that guide every adventure we create
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {[
                     {
                        icon: Users,
                        title: "Community First",
                        description: "We empower local communities through sustainable tourism, creating positive impacts that last long after your journey ends.",
                        color: "cyan"
                     },
                     {
                        icon: HeartHandshake,
                        title: "Authentic Connections",
                        description: "Building genuine relationships with cultures and people, ensuring every experience is meaningful and transformative.",
                        color: "green"
                     },
                     {
                        icon: ShieldCheck,
                        title: "Safety & Trust",
                        description: "Your wellbeing is our priority. We maintain the highest safety standards while delivering unforgettable adventures.",
                        color: "blue"
                     }
                  ].map((value, index) => (
                     <div
                        key={index}
                        className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 lg:p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                        data-aos="fade-up"
                        data-aos-delay={index * 200}
                     >
                        <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-${value.color}-500/20 border border-${value.color}-500/30 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                           <value.icon className={`w-7 h-7 lg:w-8 lg:h-8 text-${value.color}-400`} />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4">{value.title}</h3>
                        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{value.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-16 lg:py-20 px-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 relative overflow-hidden">
            <div className="absolute inset-0">
               <div className="absolute top-0 left-0 w-48 h-48 lg:w-72 lg:h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="fade-up">
               <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Ready for Your Next{' '}
                  <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                     Adventure?
                  </span>
               </h2>

               <p className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                  Join thousands of travelers who've discovered the world through our eyes. Your unforgettable journey begins here.
               </p>

               <div className="flex flex-col sm:flex-row justify-center items-center gap-3 lg:gap-4">
                  <button className="group bg-white text-cyan-600 font-black py-3 px-8 lg:py-4 lg:px-12 rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-sm lg:text-lg w-full sm:w-auto">
                     <span>Explore All Tours</span>
                     <svg className="w-4 h-4 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </button>

                  <button className="group border-2 border-white text-white font-black py-3 px-8 lg:py-4 lg:px-12 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-sm lg:text-lg w-full sm:w-auto">
                     <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <span>Get Free Consultation</span>
                  </button>
               </div>

               <div className="mt-6 lg:mt-8 flex flex-wrap justify-center gap-4 lg:gap-6 text-white/80 text-sm lg:text-base">
                  {['No Hidden Fees', '24/7 Support', 'Best Price Guarantee', 'Flexible Cancellation'].map((feature, index) => (
                     <div key={index} className="flex items-center gap-2">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{feature}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Custom CSS for animations */}
         <style>{`
            @keyframes float {
               0%, 100% { 
                  transform: translateY(0px) translateX(0px) rotate(0deg);
               }
               33% { 
                  transform: translateY(-20px) translateX(10px) rotate(120deg);
               }
               66% { 
                  transform: translateY(-10px) translateX(-5px) rotate(240deg);
               }
            }
            .animate-float {
               animation: float 20s ease-in-out infinite;
            }
            .delay-500 { animation-delay: 500ms; }
            .delay-1000 { animation-delay: 1000ms; }
         `}</style>
      </>
   );
}

export default About;