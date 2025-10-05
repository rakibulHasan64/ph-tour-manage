export const Footer = () => {
   const linkSections = [
      {
         title: "Quick Links",
         links: ["Home", "Tour Packages", "Destinations", "About Us", "Contact"]
      },
      {
         title: "Support",
         links: ["Booking Guide", "Cancellation Policy", "Travel Insurance", "Visa Assistance", "24/7 Support"]
      },
      {
         title: "Destinations",
         links: ["Bali Tour", "Europe Tour", "Thailand Tour", "Dubai Tour", "Japan Tour"]
      }
   ];

   // const paymentMethods = [
   //    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/payment/visa.svg",
   //    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/payment/mastercard.svg",
   //    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/payment/paypal.svg",
   //    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/payment/amazon.svg",
   //    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/payment/applepay.svg"
   // ];

   const paymentMethods = [
      "https://example.com/visa.png",
      "https://example.com/mastercard.png",
      "https://example.com/american-express.png",
      "https://example.com/discover.png",
      "https://example.com/googlepay.png"
   ];

   const socialLinks = [
      { name: "Facebook", icon: "📘", url: "" },
      { name: "Instagram", icon: "📷", url: "#" },
      { name: "Twitter", icon: "🐦", url: "#" },
      { name: "YouTube", icon: "📺", url: "#" }
   ];

   return (
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
         {/* Main Footer Content */}
         <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

               {/* Company Info */}
               <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-6">
                     <img
                        className="w-10 h-10"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
                        alt="TravelEase Logo"
                     />
                     <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        TravelEase
                     </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                     Discover the world with us. We create unforgettable travel experiences with premium services and expert guides.
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4 mb-6">
                     {socialLinks.map((social, index) => (
                        <a
                           key={index}
                           href={social.url}
                           className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                           aria-label={social.name}
                        >
                           <span className="text-lg">{social.icon}</span>
                        </a>
                     ))}
                  </div>
               </div>

               {/* Link Sections */}
               {linkSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                     <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-blue-400 pl-3">
                        {section.title}
                     </h3>
                     <ul className="space-y-3">
                        {section.links.map((link, i) => (
                           <li key={i}>
                              <a
                                 href="#"
                                 className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                              >
                                 <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                 {link}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-12 pt-8 border-t border-gray-700">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                     <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                     <p className="text-gray-300">Get exclusive travel deals and destination insights</p>
                  </div>
                  <div className="flex gap-3">
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-400"
                     />
                     <button className="px-6 py-3 hidden sm:block bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                        Subscribe
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Footer */}
         <div className="border-t border-gray-700">
            <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6">
               <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                  {/* Copyright */}
                  <p className="text-gray-400 text-sm text-center lg:text-left">
                     © 2025 TravelEase Tours. All rights reserved.
                  </p>

                  {/* Payment Methods */}
                  <div className="flex items-center gap-4">
                     <span className="text-gray-400 text-sm mr-2">We accept:</span>
                     <div className="flex gap-3 flex-wrap">
                        {paymentMethods.map((method, index) => (
                           <img
                              key={index}
                              src={method}
                              alt="Payment method"
                              className="h-6 w-auto bg-white rounded px-1 py-0.5"
                           />
                        ))}
                     </div>
                  </div>

                  {/* Additional Links */}
                  <div className="flex gap-6 text-sm">
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};