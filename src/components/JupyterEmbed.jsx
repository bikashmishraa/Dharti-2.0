import React from "react";

const JupyterEmbed = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{ width: "800px", height: "100px", border: "1px solid white" }}
      >
        <p className="text-neutral-content">
          df=pd.read_csv("https://raw.githubusercontent.com/bikashmishraa/Dharti-2.0/refs/heads/master/src/data/cneos_fireball_data%20(1).csv"){" "}
          <br />
          df.head() <br />
          fig = px.scatter(df, x='Peak Brightness Date/Time (UT)',y='Velocity
          (km/s)', size='Velocity (km/s)', color='Calculated Total Impact Energy
          (kt)', hover_name='Velocity (km/s)',hover_data=['Latitude
          (deg.)','Longitude (deg.)','Altitude (km)'], # removed nested list
          from 'Altitude (km)' title='Scatter Plot of Latitude, Longitude,
          Velocity, and Peak Brightness Date/Time') <br />
          fig.show()
        </p>
      </div>
      <div>
        <img src="/fireballs.png" alt="" />
      </div>
      <a
        className="text-neutral-content"
        href="https://colab.research.google.com/drive/1bpkOLd1Iw53QpAnHPYbGNqpgxH3uL6t2?fbclid=IwZXh0bgNhZW0CMTAAAR038BetCV-pV6FJvEmJxHZS-GqMpZqbiu-NWGu594Ml39w6H0xe6__kmJ8_aem_Eh5AnjBMWinR7qWuicqP5g#scrollTo=_gAPeoMvsAz2"
        target="_blank"
      >
        Go to collab
      </a>
      <div
        style={{ width: "800px", height: "100px", border: "1px solid white" }}
      >
        <p>hello</p>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <a
        href="https://colab.research.google.com/drive/1bpkOLd1Iw53QpAnHPYbGNqpgxH3uL6t2"
        target="_blank"
      >
        Go to collab
      </a>
    </div>
  );
};

export default JupyterEmbed;
