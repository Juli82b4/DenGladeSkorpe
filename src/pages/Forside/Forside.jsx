import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Hero from "../../components/Hero/Hero";
import Intro from "../../components/Intro/Intro";
import Category from "../../components/Category/Category";
import Dishes from "../../components/Dishes/Dishes";
import Footer from "../../components/Footer/Footer";

const Forside = () => {
  const textContent = `Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!`;
  return (
    <>
      <Hero />
      <Intro title="Velkommen til Den Glade Skorpe!" text={textContent} />
      <Category />
      <Dishes />
      <Footer />
    </>
  );
};

export default Forside;
