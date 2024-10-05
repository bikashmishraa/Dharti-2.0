import teamData from "../data/team/team.json";

const Team = () => {
  return (
    <section className="w-full h-screen flex-center px-2">
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">Team behind Dharti</h2>
          <p>
            Our team is a group of skilled professionals working together to
            deliver innovative solutions and turn ideas into reality.
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {teamData.map((team, idx) => (
              <div key={idx} className="">
                <div className="">
                  <img src={`/${team.image}`} alt="" className="size-9" />
                </div>
                <h3>{team.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
