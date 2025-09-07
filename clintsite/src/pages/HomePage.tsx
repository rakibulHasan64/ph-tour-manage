import FAQSection from "../components/home/FqeSection";
import Testimonials from "../components/home/TasteMonial";
import HeroSection from "./user/HeroSection";


export default function Homepage() {
   return (
      <div>
         <HeroSection />
         <FAQSection />
         <Testimonials />

      </div>
   );
}