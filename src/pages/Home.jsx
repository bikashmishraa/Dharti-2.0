import { Link } from "react-router-dom";
import HomeBg from "@/assets/home-bg.mp4";
import ContactUs from "./ContactUs";
import DataVisualization from "./DataVisualization";
import About from "./About";
import Team from "./Team";

const Home = () => {
  return (
    <>
      <section className="section-wrapper flex-center relative">
        <video
          className="absolute w-auto size-full max-w-none"
          src={HomeBg}
          autoPlay
          muted
          loop
        ></video>
        <span className="absolute inset-0 bg-black size-full bg-opacity-75" />

        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-5xl font-bold">
              WELCOME TO DHARTI 2.0 
            </h1>
            <p>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            <a
              href="https://dharti-project.vercel.app/"
              className="inline-block"
              target="_blank"
            >
              <button className="btn btn-primary text-[white]">Explore</button>
            </a>
          </div>
        </div>
      </section>
      <DataVisualization />
      <About />
      <Team />
      <ContactUs />
    </>
  );
};

export default Home;
