import Preloader from "@/components/portfolio/Preloader";
import BackgroundVideo from "@/components/portfolio/BackgroundVideo";
import HeaderTop from "@/components/portfolio/HeaderTop";
import SidebarUser from "@/components/portfolio/SidebarUser";
import HeroIntro from "@/components/portfolio/HeroIntro";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <BackgroundVideo />

      <main id="wrapper">
        <HeaderTop />
        <SidebarUser />

        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-xl-9 ml-auto ms-auto">
                <div className="wrap-container min-h-[calc(100vh-6rem)] flex flex-col justify-center">
                  <HeroIntro />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
