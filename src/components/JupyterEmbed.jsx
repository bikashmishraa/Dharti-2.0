import React from "react";
import Iframe from "react-iframe";
const JupyterEmbed = () => {
  return (
    <div style={{ width: '100%', height: '600px',display:'flex',justifyContent:'center',flexDirection:'column' }}>
      <div style={{width:'800px',height:'100px',border:'1px solid white'}}> 
        <p>hello</p>
      </div>
      <div>
          <img src="" alt="" />
      </div>
      <a href="https://colab.research.google.com/drive/1bpkOLd1Iw53QpAnHPYbGNqpgxH3uL6t2" target="_blank">
      Go to collab</a>
      <div style={{width:'800px',height:'100px',border:'1px solid white'}}> 
        <p>hello</p>
      </div>
      <div>
          <img src="" alt="" />
      </div>
      <a href="https://colab.research.google.com/drive/1bpkOLd1Iw53QpAnHPYbGNqpgxH3uL6t2" target="_blank">
      Go to collab</a>
    </div>
  );
};

export default JupyterEmbed;