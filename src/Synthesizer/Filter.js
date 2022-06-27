import React from "react";

const Filter = ({ inputChange, filterFreq, filterType }) => {
  return (
    <div className="filter" onChange={inputChange} style={{ padding: "20px" }}>
      <input
        type="radio"
        name="filterType"
        id="lowpass"
        value="lowpass"
        defaultChecked={filterType === "lowpass"}
      />
      <label htmlFor="lowpass">Lowpass</label>
      <input
        type="radio"
        name="filterType"
        id="bandpass"
        value="bandpass"
        defaultChecked={filterType === "bandpass"}
      />
      <label htmlFor="bandpass">Bandpass</label>
      <input
        type="radio"
        name="filterType"
        id="highpass"
        value="highpass"
        defaultChecked={filterType === "highpass"}
      />
      <label htmlFor="highpass">Highpass</label>
      <div className="filter-control">
        <input
          name="filterFreq"
          type="range"
          min="0"
          max="15000"
          value={filterFreq}
          onChange={inputChange}
          step="1"
        />
      </div>
      {filterFreq}Hz
    </div>
  );
};

export default Filter;
