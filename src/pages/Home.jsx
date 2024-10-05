import heroImage from "@/assets/hero-image.svg";

const Home = () => {
  return (
    <div className="hero-bg py-10">
      <div className="max-w-4xl md:space-y-7 px-5 mx-auto">
        <section className="hero bg-base-300 rounded-md shadow-md">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <div className="size-full rounded-xl">
              <img src={heroImage} alt="" />
            </div>
            <button className="btn btn-neutral">Learn More</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
