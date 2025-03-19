import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Hero from "../../components/Hero/Hero";
import Intro from "../../components/Intro/Intro";
import Category from "../../components/Category/Category";
import Dishes from "../../components/Dishes/Dishes";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";

const Forside = () => {
  const textContent = `
Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!`;
  return (
    <>
      <Hero />
      <Intro
        title="Har du spørgsmål eller ønsker du at bestille din favoritpizza?
"
        text={textContent}
      />
      <Form />

      <Footer />
    </>
  );
};

export default Forside;
