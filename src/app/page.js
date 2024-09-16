import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero /> 
        <Testimonials />
        <Features />
        <CTA />
        <Team />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
