import Preloader from "@/components/portfolio/Preloader";
import BackgroundVideo from "@/components/portfolio/BackgroundVideo";
import ColorSettingsOffcanvas from "@/components/portfolio/ColorSettingsOffcanvas";
import SidebarTools from "@/components/portfolio/SidebarTools";
import MobileNav from "@/components/portfolio/MobileNav";
import HeaderTop from "@/components/portfolio/HeaderTop";
import SidebarUser from "@/components/portfolio/SidebarUser";
import HeroIntro from "@/components/portfolio/HeroIntro";
import AboutSection from "@/components/portfolio/AboutSection";
import EducationSection from "@/components/portfolio/EducationSection";
import WorkHighlights from "@/components/portfolio/WorkHighlights";
import ServicesSection from "@/components/portfolio/ServicesSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import FooterSection from "@/components/portfolio/FooterSection";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <BackgroundVideo />
      <ColorSettingsOffcanvas />
      <MobileNav />
      <SidebarTools />

      <main id="wrapper">
        <HeaderTop />
        <SidebarUser />

        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-xl-8 ms-auto">
                <div className="wrap-container">
                  <HeroIntro />
                  <AboutSection />
                  <EducationSection />
                  <WorkHighlights />
                  <ServicesSection />
                  <TechStackSection />
                  <TestimonialsSection />
                  <ContactSection />
                  <FooterSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
