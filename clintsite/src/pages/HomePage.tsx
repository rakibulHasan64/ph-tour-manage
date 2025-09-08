import FAQSection from "../components/home/FqeSection";
import Gallery from "../components/home/Gallery";
import MostPopulerDastnation from "../components/home/MostPopulerDastnation";
import Testimonials from "../components/home/TasteMonial";
import HeroSection from "./user/HeroSection";


export default function Homepage() {
   return (
      <div>
         <HeroSection />
         <Gallery />
         <MostPopulerDastnation />
         <FAQSection />
         <Testimonials />

      </div>
   );
}