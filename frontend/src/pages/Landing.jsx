import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Popular from "../components/Popular";
import Category from "../components/Category";
import Mainfooter from "../components/Mainfooter";

const Landing=()=> (
    <>
      <Nav />
      <Hero />
    <Popular />
    <Category />
    <Mainfooter />
    </>
  );

export default Landing;
