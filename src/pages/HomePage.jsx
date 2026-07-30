import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Team from "../components/Team";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    document.title = "QR Code Llama - Free QR Code Generator";
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Testimonials />
        <div id="features">
          <Features />
        </div>
        <Team />
        <Faq />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
