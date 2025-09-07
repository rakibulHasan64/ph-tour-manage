
import { Link } from "react-router";
import {  User } from "lucide-react";


export default function Navbae() {


   const navLinks = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Taka", path: "/track-parcel" },
   ];

   return (
      <header className="fixed top-0 left-0 right-0 z-50">
         <div className="mx-auto flex items-center justify-between 
        bg-black/50 dark:bg-black px-4 py-2 rounded-full max-w-5xl">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
               <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-full" />
            </Link>

            {/* Nav Links */}
            <nav className="flex gap-8">
               {navLinks.map((link) => (
                  <Link
                     key={link.name}
                     to={link.path}
                     className="text-white font-semibold hover:text-gray-300"
                  >
                     {link.name}
                  </Link>
               ))}
            </nav>

            {/* Right section (theme + user) */}
            <div className="flex items-center gap-3">
               {/* Theme switch */}
               

               {/* User Avatar (static for demo) */}
               <button className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
               </button>
            </div>
         </div>
      </header>
   );
}
