import Aos from "aos";
import { useEffect, useState, useRef, type JSX } from "react";
import {
   MessageCircle,
   Phone,
   Mail,
   HelpCircle,
   ChevronDown,
   Star,
   Users,
   Shield,
   Globe,
   CreditCard,
   MapPin,
   Clock,
   CheckCircle
} from "lucide-react";

// Type Definitions
type FAQItem = {
   id: string;
   question: string;
   answer: string;
   icon: JSX.Element;
};

type FAQCategory = "general" | "payment" | "preparation" | "destinations";

interface CategoryColors {
   bg: string;
   light: string;
   border: string;
   text: string;
   icon: string;
   shadow: string;
}

interface CategoryColorsMap {
   general: CategoryColors;
   payment: CategoryColors;
   preparation: CategoryColors;
   destinations: CategoryColors;
}

interface StatItem {
   number: string;
   label: string;
   color: string;
}

interface FeatureItem {
   icon: JSX.Element;
   text: string;
}

// Particle Class for Canvas Animation
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
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 255)},`;
      this.alpha = Math.random() * 0.4 + 0.1;
   }

   update(): void {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > this.canvas.width) this.x = 0;
      else if (this.x < 0) this.x = this.canvas.width;
      if (this.y > this.canvas.height) this.y = 0;
      else if (this.y < 0) this.y = this.canvas.height;
   }

   draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
   }
}

function FAQSection(): JSX.Element {
   const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
   const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
   const canvasRef = useRef<HTMLCanvasElement>(null);

   // Initialize AOS animations
   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   // Canvas Animation Effect
   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const resizeCanvas = (): void => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Create particles
      const particles: Particle[] = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;

      for (let i = 0; i < particleCount; i++) {
         particles.push(new Particle(canvas));
      }

      // Animation loop
      const animate = (): void => {
         ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
         ctx.fillRect(0, 0, canvas.width, canvas.height);

         particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
         });

         requestAnimationFrame(animate);
      };

      animate();

      return (): void => {
         window.removeEventListener('resize', resizeCanvas);
      };
   }, []);

   // Toggle FAQ item
   const toggleItem = (id: string): void => {
      setOpenItems((prev) => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   // FAQ Data
   const faqData: Record<FAQCategory, FAQItem[]> = {
      general: [
         {
            id: "gen-1",
            question: "ট্যুর বুকিং করার প্রক্রিয়া কী?",
            answer: "আমাদের ওয়েবসাইট থেকে পছন্দের ট্যুর সিলেক্ট করে, তারিখ নির্ধারণ করে এবং অনলাইন পেমেন্ট সম্পন্ন করে ট্যুর বুকিং করতে পারবেন। চাইলে আমাদের হেল্পলাইনে কল করেও বুকিং করা যাবে।",
            icon: <HelpCircle className="w-6 h-6" />
         },
         {
            id: "gen-2",
            question: "ট্যুর বুকিং করার জন্য কী কী ডকুমেন্ট প্রয়োজন?",
            answer: "জাতীয় পরিচয়পত্র বা পাসপোর্টের কপি এবং অ্যাডভান্স পেমেন্ট প্রয়োজন। কিছু বিশেষ ট্যুরের জন্য অতিরিক্ত ডকুমেন্ট লাগতে পারে।",
            icon: <Users className="w-6 h-6" />
         },
         {
            id: "gen-3",
            question: "ট্যুর ক্যান্সেল করার নিয়ম কী?",
            answer: "ট্যুর শুরুর ১৫ দিন আগে ক্যান্সেল করলে পুরো টাকা ফেরত পাওয়া যাবে। ৭-১৪ দিনের মধ্যে ক্যান্সেল করলে ৫০% ফেরত দেওয়া হবে। শেষ ৭ দিনের মধ্যে ক্যান্সেল করলে রিফান্ড দেওয়া হবে না।",
            icon: <Clock className="w-6 h-6" />
         },
      ],
      payment: [
         {
            id: "pay-1",
            question: "পেমেন্ট কীভাবে করতে পারি?",
            answer: "অনলাইন ব্যাংকিং, ক্রেডিট/ডেবিট কার্ড, মোবাইল ব্যাংকিং অথবা ক্যাশের মাধ্যমে পেমেন্ট করা যাবে।",
            icon: <CreditCard className="w-6 h-6" />
         },
         {
            id: "pay-2",
            question: "কিস্তিতে পেমেন্ট করার সুযোগ আছে কি?",
            answer: "হ্যাঁ, কিছু ট্যুরের জন্য কিস্তিতে পেমেন্ট করা যায়। ৩০% অ্যাডভান্স দিয়ে বাকি টাকা ট্যুর শুরুর ৭ দিন আগে পরিশোধ করতে হবে।",
            icon: <Shield className="w-6 h-6" />
         },
         {
            id: "pay-3",
            question: "পেমেন্ট কি নিরাপদ?",
            answer: "আমাদের ওয়েবসাইট SSL secured এবং আন্তর্জাতিক মানসম্পন্ন নিরাপত্তা ব্যবস্থাপনা ব্যবহার করা হয়। আপনার পেমেন্ট সম্পূর্ণ নিরাপদ।",
            icon: <CheckCircle className="w-6 h-6" />
         },
      ],
      preparation: [
         {
            id: "prep-1",
            question: "ট্যুরে কী কী জিনিস সাথে নেবো?",
            answer: "জাতীয় পরিচয়পত্র, প্রয়োজনীয় ওষুধ, আরামদায়ক জুতা, ক্যামেরা, পাওয়ার ব্যাংক, নগদ টাকা এবং আবহাওয়া অনুযায়ী পোশাক নিতে হবে।",
            icon: <HelpCircle className="w-6 h-6" />
         },
         {
            id: "prep-2",
            question: "ট্যুরে নিরাপত্তা মেনে চলতে হবে কিভাবে?",
            answer: "গ্রুপ থেকে আলাদা হবেন না, গাইডের নির্দেশনা মেনে চলবেন, অপরিচিত জায়গায় একা ঘুরবেন না এবং জরুরি ফোন নম্বর সাথে রাখবেন।",
            icon: <Shield className="w-6 h-6" />
         },
         {
            id: "prep-3",
            question: "বাচ্চাদের জন্য আলাদা সুবিধা আছে কি?",
            answer: "হ্যাঁ, বেশিরভাগ ট্যুরে বাচ্চাদের জন্য বিশেষ সুবিধা আছে যেমন: ফ্যামিলি-ফ্রেন্ডলি হোটেল, বেবি ফুড এবং অভিজ্ঞ গাইড।",
            icon: <Users className="w-6 h-6" />
         },
      ],
      destinations: [
         {
            id: "dest-1",
            question: "সবচেয়ে জনপ্রিয় ট্যুর গুলো কী?",
            answer: "সেন্টমার্টিন, সুন্দরবন, সিলেট, কক্সবাজার, বান্দরবান এবং কাপ্তাই হ্রদ আমাদের সবচেয়ে জনপ্রিয় ট্যুর গন্তব্য।",
            icon: <MapPin className="w-6 h-6" />
         },
         {
            id: "dest-2",
            question: "বর্ষায় কোন জায়গায় ঘোরা ভালো?",
            answer: "বর্ষায় সিলেট, মৌলভীবাজার, শ্রীমঙ্গল এবং মধুপুর ভ্রমণের জন্য উপযোগী। এ সময় সমুদ্র সৈকত এলাকায় ভ্রমণ পরামর্শ দেওয়া হয় না।",
            icon: <Globe className="w-6 h-6" />
         },
         {
            id: "dest-3",
            question: "কোন ট্যুরগুলো নতুনদের জন্য ভালো?",
            answer: "কক্সবাজার, সেন্টমার্টিন, সুন্দরবন ডে ট্রিপ এবং ঢাকার ঐতিহাসিক স্থানগুলো নতুন ভ্রমণকারীদের জন্য উপযুক্ত।",
            icon: <Star className="w-6 h-6" />
         },
      ],
   };

   // Category Colors with Type Safety
   const categoryColors: CategoryColorsMap = {
      general: {
         bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500",
         light: "bg-gradient-to-br from-purple-50 to-pink-50",
         border: "border-purple-200",
         text: "text-purple-700",
         icon: "text-purple-500",
         shadow: "shadow-purple-200"
      },
      payment: {
         bg: "bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500",
         light: "bg-gradient-to-br from-green-50 to-teal-50",
         border: "border-green-200",
         text: "text-green-700",
         icon: "text-green-500",
         shadow: "shadow-green-200"
      },
      preparation: {
         bg: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
         light: "bg-gradient-to-br from-orange-50 to-red-50",
         border: "border-orange-200",
         text: "text-orange-700",
         icon: "text-orange-500",
         shadow: "shadow-orange-200"
      },
      destinations: {
         bg: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
         light: "bg-gradient-to-br from-blue-50 to-indigo-50",
         border: "border-blue-200",
         text: "text-blue-700",
         icon: "text-blue-500",
         shadow: "shadow-blue-200"
      },
   };

   const categoryLabels: Record<FAQCategory, string> = {
      general: "সাধারণ প্রশ্ন",
      payment: "পেমেন্ট",
      preparation: "প্রস্তুতি",
      destinations: "গন্তব্য"
   };

   const categoryIcons: Record<FAQCategory, JSX.Element> = {
      general: <HelpCircle className="w-6 h-6" />,
      payment: <CreditCard className="w-6 h-6" />,
      preparation: <Shield className="w-6 h-6" />,
      destinations: <MapPin className="w-6 h-6" />
   };

   // Support Features
   const supportFeatures: FeatureItem[] = [
      { icon: <Clock className="w-6 h-6" />, text: "২৪/৭ সাপোর্ট" },
      { icon: <CheckCircle className="w-6 h-6" />, text: "দ্রুত সমাধান" },
      { icon: <Users className="w-6 h-6" />, text: "বিশেষজ্ঞ টিম" }
   ];

   // Statistics Data
   const statsData: StatItem[] = [
      { number: "50K+", label: "সন্তুষ্ট ভ্রমণকারী", color: "from-green-400 to-cyan-500" },
      { number: "24/7", label: "সাপোর্ট সার্ভিস", color: "from-blue-400 to-indigo-500" },
      { number: "15m", label: "গড় রেসপন্স সময়", color: "from-purple-400 to-pink-500" },
      { number: "98%", label: "সমাধান সাফল্য", color: "from-orange-400 to-red-500" }
   ];

   return (
      <section className="relative py-20  overflow-hidden min-h-screen">
         {/* Animated Canvas Background */}
         <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
         />

         {/* Enhanced Background Elements */}
         <div className="absolute inset-0">
            {/* <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1500"></div> */}

            {/* Floating Elements */}
            {[...Array(12)].map((_, index) => (
               <div
                  key={index}
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

         <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16" data-aos="fade-up">
               <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 border border-white/20 mb-8">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg font-bold text-white">সাহায্য কেন্দ্র</span>
               </div>

               <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  আপনার{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                     প্রশ্নের উত্তর
                  </span>
               </h1>

               <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  ভ্রমণ সম্পর্কিত সকল সাধারণ প্রশ্নের উত্তর একসাথে। যদি আরও কিছু জানার প্রয়োজন হয়, আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
               </p>
            </div>

            {/* Category Navigation - Responsive */}
            <div className="flex flex-wrap justify-center gap-3 mb-16" data-aos="fade-up" data-aos-delay="200">
               {(Object.keys(faqData) as FAQCategory[]).map((category) => {
                  const colors = categoryColors[category];
                  return (
                     <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`group relative flex items-center px-4 py-3 lg:px-8 lg:py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 overflow-hidden ${activeCategory === category
                           ? `${colors.bg} text-white shadow-2xl`
                           : "bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white"
                           }`}
                     >
                        {/* Animated background for active state */}
                        {activeCategory === category && (
                           <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        )}

                        <span className={`mr-3 lg:mr-4 transition-transform duration-300 group-hover:scale-110 ${activeCategory === category ? "text-white" : "text-gray-400"
                           }`}>
                           {categoryIcons[category]}
                        </span>

                        <span className="text-sm lg:text-lg whitespace-nowrap">{categoryLabels[category]}</span>

                        {activeCategory === category && (
                           <div className="absolute -bottom-2 -right-2 w-4 h-4 lg:w-6 lg:h-6 bg-yellow-400 rounded-full animate-bounce">
                              <Star className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" />
                           </div>
                        )}
                     </button>
                  );
               })}
            </div>

            {/* FAQ Content - Responsive Grid */}
            <div className="max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="400">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {faqData[activeCategory].map((item, index) => {
                     const colors = categoryColors[activeCategory];
                     return (
                        <div
                           key={item.id}
                           className={`group relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden transition-all duration-500 transform hover:-translate-y-1 ${openItems[item.id]
                              ? `ring-2 ring-opacity-30 ${colors.shadow} shadow-2xl`
                              : 'hover:shadow-xl'
                              }`}
                           style={{
                              animationDelay: `${index * 100}ms`
                           }}
                        >
                           {/* Gradient border effect */}
                           <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                           <button
                              onClick={() => toggleItem(item.id)}
                              className="flex justify-between items-start w-full p-6 text-left transition-all duration-300 group-hover:bg-white/5"
                           >
                              <div className="flex items-start space-x-4 flex-1">
                                 {/* Icon Container */}
                                 <div className={`flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-2xl ${colors.light} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <div className={colors.icon}>
                                       {item.icon}
                                    </div>
                                 </div>

                                 {/* Question */}
                                 <div className="flex-1">
                                    <h3 className="text-[12px] sm:text-md md:text-lg lg:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors leading-relaxed">
                                       {item.question}
                                    </h3>
                                 </div>
                              </div>

                              {/* Chevron Icon */}
                              <ChevronDown
                                 className={`w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 flex-shrink-0 mt-1 lg:mt-2 ${openItems[item.id] ? "rotate-180 scale-110" : "group-hover:scale-110"
                                    } text-cyan-400`}
                              />
                           </button>

                           {/* Answer */}
                           <div
                              className={`overflow-hidden transition-all duration-500 ease-out ${openItems[item.id]
                                 ? "max-h-96 opacity-100"
                                 : "max-h-0 opacity-0"
                                 }`}
                           >
                              <div className="px-6 pb-6">
                                 <div className="pl-16 lg:pl-20 border-l-2 border-cyan-400/50">
                                    <p className="text-gray-200 leading-relaxed text-sm lg:text-lg bg-white/5 rounded-2xl p-4 lg:p-6 backdrop-blur-sm">
                                       {item.answer}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Support CTA Section */}
            <div className="mt-20" data-aos="fade-up" data-aos-delay="600">
               <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-2 border border-white/20">
                  <div className="bg-gradient-to-r from-slate-900 to-gray-900 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
                     {/* Pattern Overlay */}
                     <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500 via-transparent to-purple-500"></div>
                     </div>

                     <div className="relative z-10">
                        <h3 className="text-2xl lg:text-4xl font-black text-white mb-6">
                           এখনও উত্তর পাননি?
                        </h3>
                        <p className="text-lg lg:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
                           আমাদের বিশেষজ্ঞ টিম আপনার সকল প্রশ্নের উত্তর দিতে প্রস্তুত। ২৪/৭ সাপোর্ট সার্ভিস।
                        </p>

                        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mb-8 lg:mb-12">
                           <a
                              href="tel:+8801700000000"
                              className="group flex items-center gap-3 lg:gap-4 px-6 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl w-full lg:w-auto"
                           >
                              <Phone className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                              <div className="text-left">
                                 <div className="text-xs lg:text-sm opacity-90">কল করুন</div>
                                 <div className="text-sm lg:text-lg">+৮৮০ ১৭০০-০০০০০০</div>
                              </div>
                           </a>

                           <a
                              href="mailto:support@travelbangla.com"
                              className="group flex items-center gap-3 lg:gap-4 px-6 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl w-full lg:w-auto"
                           >
                              <Mail className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                              <div className="text-left">
                                 <div className="text-xs lg:text-sm opacity-90">ইমেইল করুন</div>
                                 <div className="text-[8px] md:text-md lg:text-lg">support@travelbangla.com</div>
                              </div>
                           </a>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                           {supportFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center justify-center gap-3 text-cyan-300 bg-white/5 rounded-2xl p-4">
                                 {feature.icon}
                                 <span className="font-semibold text-sm lg:text-base">{feature.text}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Quick Stats - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-18" data-aos="fade-up">
               {statsData.map((stat, index) => (
                  <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
                     <div className={`text-xl lg:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.number}
                     </div>
                     <div className="text-gray-300 font-semibold text-sm lg:text-base">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>

         {/* Custom CSS for animations */}
         <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1500 { animation-delay: 1500ms; }
      `}</style>
      </section>
   );
}

export default FAQSection;