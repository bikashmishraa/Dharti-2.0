const About = () => {
  return (
    <section className="section-wrapper">
      <div className="flex-center">
        <div className="space-y-8">
          <div className="space-y-3 text-neutral-content">
            <h2 className="text-3xl font-semibold">About the challenge</h2>
            <div className="text-lg space-y-2.5">
              <p>
                The challenge is to develop an interactive orrery web
                application embedded in a webpage, which visualizes celestial
                bodies like planets, Near-Earth Asteroids (NEA), Near-Earth
                Comets (NEC), and Potentially Hazardous Asteroids (PHA). These
                objects can be visualized either as static or dynamic models,
                with real-time positions and orbital trajectories based on
                Keplerian parameters. The web app should educate users about
                celestial bodies, simulate their movement, and provide a
                visually appealing experience that is informative and engaging.
              </p>

              <p>
                To achieve this, participants can leverage publicly available
                NASA databases and Keplerian parameter data to map the orbits
                and positions of these bodies. The application must be
                interactive, allowing users to zoom, pan, toggle labels, and
                explore different celestial objects dynamically or statically.
              </p>

              <p>
                The challenge requires understanding 3D graphics libraries,
                orbital propagators, and utilizing real-world data to simulate
                the solar system and near-Earth objects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
