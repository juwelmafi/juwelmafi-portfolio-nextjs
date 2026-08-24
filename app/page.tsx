import Preloader from "@/components/isak/Preloader";
import BackgroundVideo from "@/components/isak/BackgroundVideo";
import ColorSettingsOffcanvas from "@/components/isak/ColorSettingsOffcanvas";
import SidebarTools from "@/components/isak/SidebarTools";
import MobileNav from "@/components/isak/MobileNav";
import HeaderTop from "@/components/isak/HeaderTop";
import SidebarUser from "@/components/isak/SidebarUser";
import HeroIntro from "@/components/isak/HeroIntro";
import AboutSection from "@/components/isak/AboutSection";
import EducationSection from "@/components/isak/EducationSection";
import WorkHighlights from "@/components/isak/WorkHighlights";
import ServicesSection from "@/components/isak/ServicesSection";
import TechStackSection from "@/components/isak/TechStackSection";
import TestimonialsSection from "@/components/isak/TestimonialsSection";
import ContactSection from "@/components/isak/ContactSection";
import FooterSection from "@/components/isak/FooterSection";
import SmoothScroll from "@/components/isak/SmoothScroll";

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
