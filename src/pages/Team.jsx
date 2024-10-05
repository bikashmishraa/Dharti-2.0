import teamData from "../data/team/team.json";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

const Team = () => {
  return (
    <section className="section-wrapper flex-center">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">Team behind Dharti</h2>
          <p className="text-lg">
            Our team is a group of skilled professionals working together to
            deliver innovative solutions and turn ideas into reality.
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamData.map((team, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className="w-full h-80 bg-center bg-cover bg-no-repeat rounded-lg shadow-lg"
                  style={{ backgroundImage: `url(${team.image})` }}
                ></div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium text-primary">
                    {team.name}
                  </h3>
                  <ul className="flex-center gap-2 text-xl text-primary">
                    <li>
                      <a href={team.social.linkedin}>
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a href={team.social.instagram}>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href={team.social.facebook}>
                        <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a href={team.social.github}>
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
