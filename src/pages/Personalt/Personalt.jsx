import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Hero from "../../components/Hero/Hero";
import Intro from "../../components/Intro/Intro";
import Footer from "../../components/Footer/Footer";
import Staff from "../../components/Staff/Staff";

const Forside = () => {
  const textContent = `Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer.`;
  return (
    <>
      <Hero />
      <Intro title="Personalet hos Den Glade Skorpe" text={textContent} />
      <Staff />
      <Footer />
    </>
  );
};

export default Forside;
