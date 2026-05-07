import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Marketplace from "../components/sections/Marketplace";
import TrustArchitecture from "../components/sections/TrustArchitecture";
import ReportsPreview from "../components/sections/ReportsPreview";
import ServicesSection from "../components/sections/Services";
import ExpertsSection from "../components/sections/Experts";


const Home = () => {
  return (
    <div className="home-container bg-bg-base min-h-screen text-text-primary selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Marketplace />
        <TrustArchitecture />
        <ReportsPreview />
        <ExpertsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

