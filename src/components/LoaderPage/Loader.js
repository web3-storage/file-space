import React from "react";
import LineBg from "../LineBg/LineBg";
import Loader from "../Loader/Loader";

export default function LoaderPage() {
  return (
    <section className="min-vh-100 relative pa6 bg-navy white flex justify-center">
      <LineBg></LineBg>
      <div className="tc">
        <Loader />
        <div className="mt2">....Loading....</div>
      </div>
    </section>
  );
}
