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
            <h1 className="text-5xl font-bold">WELCOME TO DHARTI 2.0</h1>
            <p>
              Explore our dynamic orrery! Track real-time Near-Earth Objects
              like satellites, meteors, and asteroids as they orbit nearby.
              Discover and visualize their paths with ease.
            </p>

            <a
              href="https://earth-dharti.vercel.app/"
              className="inline-block"
              target="_blank"
            >
              <button className="btn btn-primary text-[white] px-9 py-3">
                Explore
              </button>
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
