import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyChoose from "../components/WhyChoose";
import ProductSection from "../components/ProductSection";
import JourneySection from "../components/JourneySection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <WhyChoose/>
      <ProductSection/>
      <JourneySection/>
      <Footer/>

    </div>
  );
};

export default HomePage;
