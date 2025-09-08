import FAQSection from "../components/home/FqeSection";
import Gallery from "../components/home/Gallery";
import Testimonials from "../components/home/TasteMonial";
import HeroSection from "./user/HeroSection";


export default function Homepage() {
   return (
      <div>
         <HeroSection />
         <Gallery />
         <FAQSection />
         <Testimonials />

      </div>
   );
}