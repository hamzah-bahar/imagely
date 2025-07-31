import HeroSection from "../components/HeroSection";
import ImageListing from "../components/ImageListing";
export default function Home() {
  return (
    <div className="flex flex-col grow">
      <HeroSection />
      <ImageListing />
    </div>
  );
}
