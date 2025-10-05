import Aos from "aos";
import { useEffect, useState } from "react";

type FAQItem = {
   id: string;
   question: string;
   answer: string;
};

type FAQCategory = "general" | "payment" | "preparation" | "destinations";

function FAQSection() {
   const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
   const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
   useEffect(() => {
      Aos.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const toggleItem = (id: string) => {
      setOpenItems((prev) => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   const faqData: Record<FAQCategory, FAQItem[]> = {
      general: [
         {
            id: "gen-1",
            question: "ট্যুর বুকিং করার প্রক্রিয়া কী?",
            answer:
               "আমাদের ওয়েবসাইট থেকে পছন্দের ট্যুর সিলেক্ট করে, তারিখ নির্ধারণ করে এবং অনলাইন পেমেন্ট সম্পন্ন করে ট্যুর বুকিং করতে পারবেন। চাইলে আমাদের হেল্পলাইনে কল করেও বুকিং করা যাবে।",
         },
         {
            id: "gen-2",
            question: "ট্যুর বুকিং করার জন্য কী কী ডকুমেন্ট প্রয়োজন?",
            answer:
               "জাতীয় পরিচয়পত্র বা পাসপোর্টের কপি এবং অ্যাডভান্স পেমেন্ট প্রয়োজন। কিছু বিশেষ ট্যুরের জন্য অতিরিক্ত ডকুমেন্ট লাগতে পারে।",
         },
         {
            id: "gen-3",
            question: "ট্যুর ক্যান্সেল করার নিয়ম কী?",
            answer:
               "ট্যুর শুরুর ১৫ দিন আগে ক্যান্সেল করলে পুরো টাকা ফেরত পাওয়া যাবে। ৭-১৪ দিনের মধ্যে ক্যান্সেল করলে ৫০% ফেরত দেওয়া হবে। শেষ ৭ দিনের মধ্যে ক্যান্সেল করলে রিফান্ড দেওয়া হবে না।",
         },
      ],
      payment: [
         {
            id: "pay-1",
            question: "পেমেন্ট কীভাবে করতে পারি?",
            answer:
               "অনলাইন ব্যাংকিং, ক্রেডিট/ডেবিট কার্ড, মোবাইল ব্যাংকিং অথবা ক্যাশের মাধ্যমে পেমেন্ট করা যাবে।",
         },
         {
            id: "pay-2",
            question: "কিস্তিতে পেমেন্ট করার সুযোগ আছে কি?",
            answer:
               "হ্যাঁ, কিছু ট্যুরের জন্য কিস্তিতে পেমেন্ট করা যায়। ৩০% অ্যাডভান্স দিয়ে বাকি টাকা ট্যুর শুরুর ৭ দিন আগে পরিশোধ করতে হবে।",
         },
         {
            id: "pay-3",
            question: "পেমেন্ট কি নিরাপদ?",
            answer:
               "আমাদের ওয়েবসাইট SSL secured এবং আন্তর্জাতিক মানসম্পন্ন নিরাপত্তা ব্যবস্থাপনা ব্যবহার করা হয়। আপনার পেমেন্ট সম্পূর্ণ নিরাপদ।",
         },
      ],
      preparation: [
         {
            id: "prep-1",
            question: "ট্যুরে কী কী জিনিস সাথে নেবো?",
            answer:
               "জাতীয় পরিচয়পত্র, প্রয়োজনীয় ওষুধ, আরামদায়ক জুতা, ক্যামেরা, পাওয়ার ব্যাংক, নগদ টাকা এবং আবহাওয়া অনুযায়ী পোশাক নিতে হবে।",
         },
         {
            id: "prep-2",
            question: "ট্যুরে নিরাপত্তা মেনে চলতে হবে কিভাবে?",
            answer:
               "গ্রুপ থেকে আলাদা হবেন না, গাইডের নির্দেশনা মেনে চলবেন, অপরিচিত জায়গায় একা ঘুরবেন না এবং জরুরি ফোন নম্বর সাথে রাখবেন।",
         },
         {
            id: "prep-3",
            question: "বাচ্চাদের জন্য আলাদা সুবিধা আছে কি?",
            answer:
               "হ্যাঁ, বেশিরভাগ ট্যুরে বাচ্চাদের জন্য বিশেষ সুবিধা আছে যেমন: ফ্যামিলি-ফ্রেন্ডলি হোটেল, বেবি ফুড এবং অভিজ্ঞ গাইড।",
         },
      ],
      destinations: [
         {
            id: "dest-1",
            question: "সবচেয়ে জনপ্রিয় ট্যুর গুলো কী?",
            answer:
               "সেন্টমার্টিন, সুন্দরবন, সিলেট, কক্সবাজার, বান্দরবান এবং কাপ্তাই হ্রদ আমাদের সবচেয়ে জনপ্রিয় ট্যুর গন্তব্য।",
         },
         {
            id: "dest-2",
            question: "বর্ষায় কোন জায়গায় ঘোরা ভালো?",
            answer:
               "বর্ষায় সিলেট, মৌলভীবাজার, শ্রীমঙ্গল এবং মধুপুর ভ্রমণের জন্য উপযোগী। এ সময় সমুদ্র সৈকত এলাকায় ভ্রমণ পরামর্শ দেওয়া হয় না।",
         },
         {
            id: "dest-3",
            question: "কোন ট্যুরগুলো নতুনদের জন্য ভালো?",
            answer:
               "কক্সবাজার, সেন্টমার্টিন, সুন্দরবন ডে ট্রিপ এবং ঢাকার ঐতিহাসিক স্থানগুলো নতুন ভ্রমণকারীদের জন্য উপযুক্ত।",
         },
      ],
   };

   // Category colors
   const categoryColors = {
      general: "bg-gradient-to-r from-purple-500 to-pink-500",
      payment: "bg-gradient-to-r from-green-500 to-teal-500",
      preparation: "bg-gradient-to-r from-orange-500 to-red-500",
      destinations: "bg-gradient-to-r from-blue-500 to-indigo-500",
   };

   // Category icons
   const categoryIcons = {
      general: (
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
      ),
      payment: (
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
      ),
      preparation: (
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
         </svg>
      ),
      destinations: (
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
         </svg>
      ),
   };

   return (
      <section className="py-16 bg-gradient-to-b from-blue-50 to-indigo-5">
         <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  প্রশ্ন <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">উত্তর</span>
               </h2>
               <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
                  আমাদের ট্যুর, বুকিং এবং ভ্রমণ সম্পর্কিত সাধারণ প্রশ্নের উত্তর
                  এখানে পাবেন।
               </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
               {Object.keys(faqData).map((category) => (
                  <button
                     key={category}
                     onClick={() => setActiveCategory(category as FAQCategory)}
                     className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category
                        ? `${categoryColors[category as FAQCategory]} text-white shadow-lg`
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                        }`}
                  >
                     <span className="mr-2">
                        {categoryIcons[category as FAQCategory]}
                     </span>
                     {category === "general" && "সাধারণ প্রশ্ন"}
                     {category === "payment" && "পেমেন্ট"}
                     {category === "preparation" && "প্রস্তুতি"}
                     {category === "destinations" && "গন্তব্য"}
                  </button>
               ))}
            </div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto">
               {faqData[activeCategory].map((item, index) => (
                  <div data-aos="fade-up"
                     key={item.id}
                     className={`mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${openItems[item.id]
                        ? "ring-2 ring-opacity-50"
                        : "hover:shadow-xl"
                        } ${openItems[item.id] ? `ring-${activeCategory === "general" ? "purple" : activeCategory === "payment" ? "green" : activeCategory === "preparation" ? "orange" : "blue"}-500` : ""
                        }`}
                     style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: "fadeIn 0.5s ease-out forwards",
                        opacity: 0,
                        transform: "translateY(20px)",
                     }}
                  >
                     <button
                        onClick={() => toggleItem(item.id)}
                        className="flex justify-between items-center w-full p-6 text-left font-medium text-gray-800 hover:bg-gray-50 transition-all duration-300"
                     >
                        <div className="flex items-start">
                           <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${activeCategory === "general" ? "bg-purple-100 text-purple-600" : activeCategory === "payment" ? "bg-green-100 text-green-600" : activeCategory === "preparation" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </span>
                           <span className="text-lg">{item.question}</span>
                        </div>
                        <svg
                           className={`w-6 h-6 transition-transform duration-300 flex-shrink-0 ${openItems[item.id] ? "rotate-180" : ""
                              } ${activeCategory === "general" ? "text-purple-600" : activeCategory === "payment" ? "text-green-600" : activeCategory === "preparation" ? "text-orange-600" : "text-blue-600"}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>
                     <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openItems[item.id]
                           ? "max-h-96 opacity-100"
                           : "max-h-0 opacity-0"
                           }`}
                     >
                        <div className="p-6 pt-0 pl-12 text-gray-600">
                           <div className={`pl-4 border-l-2 ${activeCategory === "general" ? "border-purple-500" : activeCategory === "payment" ? "border-green-500" : activeCategory === "preparation" ? "border-orange-500" : "border-blue-500"}`}>
                              <p>{item.answer}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Additional Help */}
            <div className="text-center mt-16" data-aos="fade-up">
               <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 max-w-2xl mx-auto text-white shadow-xl">
                  <h3 className="text-2xl font-semibold mb-4">
                     আরও প্রশ্ন আছে?
                  </h3>
                  <p className="mb-6 opacity-90">
                     আমাদের সাপোর্ট টিম সবসময় আপনার সাহায্যের জন্য প্রস্তুত।
                     বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-md">
                        কল করুন: +৮৮০ ১৭XX-XXXXXX
                     </button>
                     <button className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1">
                        ইমেইল করুন
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Add CSS animations */}
         
      </section>
   );
}

export default FAQSection;