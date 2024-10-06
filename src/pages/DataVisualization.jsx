import CollabData from "@/data/collab/collab.json";

const DataVisualization = () => {
  return (
    <section className="section-wrapper">
      <div className="space-y-8">
        <div className="space-y-3 text-neutral-content">
          <h2 className="text-3xl font-semibold">Data Visualization</h2>
          <p className="text-lg">
            Transform complex information into clear, actionable insights,
            helping you make informed decisions with ease.
          </p>
        </div>
        <div className="space-y-4">
          {CollabData.map((collab, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-neutral-content text-2xl font-medium">
                {collab.title}
              </h3>
              <img src={`/${collab.image}`} alt="" className="rounded-lg" />
              <a
                href={collab.url}
                className="text-neutral-content text-lg hover:underline"
              >
                Go to collab
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
