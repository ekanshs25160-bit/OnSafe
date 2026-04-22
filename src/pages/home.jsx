import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import StatsSection from "../components/sections/Stats";
import Sprints from "../components/sections/Sprints";
import TrustArchitecture from "../components/sections/TrustArchitecture";
import DashboardPreview from "../components/sections/DashboardPreview";
import ProjectsSection from "../components/sections/Projects";
import TeamSection from "../components/sections/Team";


const Home = () => {
  return (
    <div className="home-container bg-bg-base min-h-screen text-text-primary selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <Sprints />
        <TrustArchitecture />
        <DashboardPreview />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

