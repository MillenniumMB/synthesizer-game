import React, { useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = audioContext.createGain();
let biquadFilter = audioContext.createBiquadFilter();

const Oscillator = ({ waveform, filterType, filterFreq, gainValue }) => {
  const [oscillators, setOscillators] = useState({});

  const playSound = midiNumber => {
    let oscillator = audioContext.createOscillator();
    oscillator.type = waveform;
    oscillator.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    biquadFilter.type = filterType;
    biquadFilter.frequency.setValueAtTime(filterFreq, audioContext.currentTime);
    biquadFilter.gain.setValueAtTime(25, audioContext.currentTime);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = gainValue;
    oscillator.frequency.value = Math.pow(2, (midiNumber - 69) / 12) * 440;
    setOscillators({ ...oscillators, [midiNumber]: oscillator });
    oscillator.start();
  };

  const stopSound = midiNumber => {
    oscillators[midiNumber].stop();
    delete oscillators[midiNumber];
  };

  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={midiNumber => {
        playSound(midiNumber);
      }}
      stopNote={midiNumber => {
        stopSound(midiNumber);
      }}
      width={700}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default Oscillator;
