import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Team from "../components/Team";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function Home() {
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
}
