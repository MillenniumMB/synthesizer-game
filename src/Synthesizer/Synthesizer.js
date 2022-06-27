import React, { useState } from "react";
import Oscillator from "./Oscillator";
import ChangeWaveform from "./ChangeWaveform";
import Gain from "./Gain";
import Filter from "./Filter";
import "./Piano.css";





const Synthesizer = () => {
  const [effects, setEffects] = useState({
    waveform: "sine",
    gainValue: 0.15,
    filterType: "lowpass",
    filterFreq: 15000
  });

  const inputChange = e => {
    setEffects({ ...effects, [e.target.name]: e.target.value });
  };

  return (

    <div className="synthesizer">

      <div className="piano">
        <Oscillator
          waveform={effects.waveform}
          filterType={effects.filterType}
          filterFreq={effects.filterFreq}
          gainValue={effects.gainValue}
        />
      </div>
      <div className="effects">
        <ChangeWaveform inputChange={inputChange} waveform={effects.waveform} />
        <Gain inputChange={inputChange} gainValue={effects.gainValue} />
        <Filter
          inputChange={inputChange}
          filterType={effects.filterType}
          filterFreq={effects.filterFreq}
        />
      </div>
    </div>
  );
};

export default Synthesizer;
