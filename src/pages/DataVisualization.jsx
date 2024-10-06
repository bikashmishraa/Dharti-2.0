import CollabData from "@/data/collab/collab.json";

const DataVisualization = () => {
  return (
    <section className="section-wrapper">
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
    </section>
  );
};

export default DataVisualization;
