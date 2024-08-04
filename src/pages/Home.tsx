import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import About from "../components/About";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

import VideoBackground from "../common/VideoBackground/VideoBackground";
import BacktoTopBtn from "../common/BackToTopBtn/BacktoTopBtn";
import MobileProjects from "../components/MobileProjects";
import MobileNav from "../components/MobileNav";

function Home() {
  const detectDevice = (): string => {
    if (document.body.clientWidth < 1050) {
      // TODO: test efficient way to test user's device type
      // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return "mobile";
    } else {
      return "desktop";
    }
  };

  return (
    <>
      {/* Miscelaneous */}
      <BacktoTopBtn anchorId="#top" />
      <VideoBackground />

      {/* Main Estructure */}

      {detectDevice() === "desktop" ? <Nav /> : <MobileNav />}

      {/*Section #1*/}
      <Hero />
      <About />
      {/*Section #2*/}
      {detectDevice() === "desktop" ? <Projects /> : <MobileProjects />}
      {/*Section #3*/}
      <Contact />

      <Footer />
    </>
  );
}

export default Home;
