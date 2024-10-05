import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="section-wrapper flex-center">
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">
            Welcome to <br /> Dharti-2.0
          </h1>
          <p>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>

          <Link to="/about" className="inline-block">
            <button className="btn btn-primary text-[white]">Learn More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
