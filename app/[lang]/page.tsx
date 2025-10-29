import HeroSection from "@/components/home-page-sections/HeroSection/HeroSection";
import NewsSection from "@/components/home-page-sections/NewsSection/NewsSection";
import OnlineNotification from "@/components/home-page-sections/OnlineNotification/OnlineNotification";
import OnlineUserSection from "@/components/home-page-sections/OnlineUserSection/OnlineUserSection";
import SecuritySection from "@/components/home-page-sections/SecuritySection/SecuritySection";
import ServicesSection from "@/components/home-page-sections/ServicesSection/ServicesSection";
import TestimonialsSection from "@/components/home-page-sections/TestimonialsSection/TestimonialsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <OnlineUserSection />
      <ServicesSection />
      <NewsSection />
      <TestimonialsSection />
      <SecuritySection />
      <OnlineNotification></OnlineNotification>
    </div>
  );
}
