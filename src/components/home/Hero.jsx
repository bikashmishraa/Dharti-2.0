import heroImage from "@/assets/hero-image.svg";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <div
      className="hero pt-16 min-h-screen"
      style={{
        backgroundImage: `url(${heroBackground})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
<<<<<<< HEAD
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to <br /> <span className="text-[red]"> Dharti-2.0 </span>
=======
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">
            Welcome to <br /> Dharti-2.0
>>>>>>> b978bd67ac7cb3a0f762602060086ff20607bd22
          </h1>
          <p>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary text-[white]">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
