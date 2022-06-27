import React from "react";

const ChangeWaveform = ({ inputChange, waveform }) => {
  return (
    <div className="waveform" style={{ padding: "20px" }}>
      Waveform:
      <div className="waveform-control" onChange={inputChange}>
        <input
          type="radio"
          name="waveform"
          id="sine"
          value="sine"
          defaultChecked={waveform === "sine"}
        />
        <label htmlFor="sine">Sine</label>
        <input
          type="radio"
          name="waveform"
          id="square"
          value="square"
          defaultChecked={waveform === "square"}
        />
        <label htmlFor="square">Square</label>
        <input
          type="radio"
          name="waveform"
          id="triangle"
          value="triangle"
          defaultChecked={waveform === "triangle"}
        />
        <label htmlFor="triangle">Triangle</label>
        <input
          type="radio"
          name="waveform"
          id="sawtooth"
          value="sawtooth"
          defaultChecked={waveform === "sawtooth"}
        />
        <label htmlFor="sawtooth">Sawtooth</label>
      </div>
    </div>
  );
};

export default ChangeWaveform;
