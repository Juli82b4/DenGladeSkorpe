import React from "react";
import Hero from "../../components/Hero/Hero";
import Intro from "../../components/Intro/Intro";
import Footer from "../../components/Footer/Footer";
import OrderSection from "../../components/OrderSection/OrderSection";

const Kurv = () => {
  return (
    <>
      <Hero />
      <Intro title="Bestilling" />
      <OrderSection />
      <Footer />
    </>
  );
};

export default Kurv;
