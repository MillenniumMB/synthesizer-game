import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";

import Oscillator from "./Synthesizer/Synthesizer";

import "./index.css";
import $ from "jquery";


const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

//пианино
const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4")
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

const stageZeroNotes = [
  { midiNumber: 55, time: 1.0, duration: 0.5 }, //sol
  { midiNumber: 52, time: 2.0, duration: 0.5 }, //me
  { midiNumber: 52, time: 3.0, duration: 1.0 },
  { midiNumber: 53, time: 4.0, duration: 0.5 }, //fa
  { midiNumber: 50, time: 5.0, duration: 0.5 }, //re
  { midiNumber: 50, time: 6.0, duration: 1.0 },
  { midiNumber: 48, time: 7.0, duration: 0.5 }, //do
  { midiNumber: 50, time: 8.0, duration: 0.5 },
  { midiNumber: 52, time: 9.0, duration: 0.5 },
  { midiNumber: 53, time: 10.0, duration: 0.5 },
  { midiNumber: 55, time: 11.0, duration: 0.5 },
  { midiNumber: 55, time: 12.0, duration: 0.5 },
  { midiNumber: 55, time: 13.0, duration: 1.0 }
];


const notesArray = [
  { img: "Do.PNG", text: "Do", position: 0 },
  { img: "Re.PNG", text: "Re", position: 2 },
  { img: "Mi.PNG", text: "Mi", position: 4 },
  { img: "Fa.PNG", text: "Fa", position: 5 },
  { img: "Sol.PNG", text: "Sol", position: 7 },
  { img: "La.PNG", text: "La", position: 9 },
  { img: "Ti.PNG", text: "Si", position: 11 },
  { img: "Do1.PNG", text: "Do'", position: 12 }
];




class App extends React.Component {

  state = {
    notesArr: notesArray,
    stageActive: false,
    stageEnd: false,
    activeNoteLetter: "",
    numSuccesses: 0,
    numErrors: 0,
    stage: 0,
    learnStage: false,
    synthesizerPage: false,
    homePage: true,
    imageSrc: "stage0.PNG",
    listened: false,
    playingNoVoice: true,
    recording: {
      mode: "RECORDING",
      events: stageZeroNotes,
      currentTime: 0,
      currentEvents: []
    }
  };

  constructor(props) {
    super(props);

    this.scheduledEvents = [];
  }

  sleep = m => new Promise(r => setTimeout(r, m));

  startStageZeroHiglights = () => {
    this.setState({ stageActive: true, numErrors: 0, numSuccesses: 0 });
    this.onClickClear();
    const notes = document.getElementsByClassName(
      "ReactPiano__Keyboard container"
    )[0].children;

    // check if class is active to see if user succeeses
    const sleep = m => new Promise(r => setTimeout(r, m));
    (async () => {
      await sleep(1000);
      //55
      this.setState({ activeNoteLetter: "g" });
      notes[7].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[7].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //52
      this.setState({ activeNoteLetter: "d" });
      notes[4].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[4].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //52
      this.setState({ activeNoteLetter: "d" });
      notes[4].classList.add("ReactPiano__Key--active");
      await sleep(1000);
      notes[4].classList.remove("ReactPiano__Key--active");
      this.setState({ activeNoteLetter: "" });

      //53
      this.setState({ activeNoteLetter: "f" });
      notes[5].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[5].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //50
      this.setState({ activeNoteLetter: "s" });
      notes[2].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[2].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //50
      this.setState({ activeNoteLetter: "s" });
      notes[2].classList.add("ReactPiano__Key--active");
      await sleep(1000);
      notes[2].classList.remove("ReactPiano__Key--active");
      this.setState({ activeNoteLetter: "" });

      //48
      this.setState({ activeNoteLetter: "a" });
      notes[0].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[0].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //50
      this.setState({ activeNoteLetter: "s" });
      notes[2].classList.add("ReactPiano__Key--active");
      await sleep(1000);
      notes[2].classList.remove("ReactPiano__Key--active");
      this.setState({ activeNoteLetter: "" });

      //52
      this.setState({ activeNoteLetter: "d" });
      notes[4].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[4].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //53
      this.setState({ activeNoteLetter: "f" });
      notes[5].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[5].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //55
      this.setState({ activeNoteLetter: "g" });
      notes[7].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[7].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //55
      this.setState({ activeNoteLetter: "g" });
      notes[7].classList.add("ReactPiano__Key--active");
      await sleep(500);
      notes[7].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });

      //55
      this.setState({ activeNoteLetter: "g" });
      notes[7].classList.add("ReactPiano__Key--active");
      await sleep(1000);
      notes[7].classList.remove("ReactPiano__Key--active");
      await sleep(500);
      this.setState({ activeNoteLetter: "" });
      this.setState({ stageActive: false });
      this.setState({ stageEnd: true });
    })();
  };


  onClickStartHighlights = () => {

    this.startStageZeroHiglights();

    const vid = document.getElementsByClassName("vid")[0];
    vid.muted = true;
    vid.play();
  };

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map(event => event.time + event.duration)
    );
  };

  setRecording = value => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value)
    });
  };

  Set = () => {
    this.setState({ stage: 0.5 });

    this.setState({
      numErrors: 0,
      numSuccesses: 0,
      listened: !this.state.listened,
      recording: {
        mode: "RECORDING",
        currentTime: 0,
        currentEvents: []
      }
    });
  };

  onClickNext = () => {
    this.Set();
  };

  onClickPlay = () => {
    const vid = document.getElementsByClassName("vid")[0];
    vid.muted = true;
    vid.play();

    this.setRecording({
      mode: "PLAYING"
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, event => [
        event.time,
        event.time + event.duration
      ])
    );
    startAndEndTimes.forEach(time => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter(event => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents
          });
        }, time * 1000)
      );
    });

    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach(scheduledEvent => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: []
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0
    });
  };

  renderStageWithSound = () => {

    return (
      <Fragment>
        <div className="container">
          <h3>Ready? press the play button and listen to the playing notes</h3>
          <br />
          <div
            style={{
              backgroundColor: "white",
              maxWidth: "780px",
              margin: "auto"
            }}
          >
            <video className="vid" style={{ width: "400px", height: "auto" }}>
              <source src="s00.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{ height: "10px" }} />
          <div className="mt-5 container">
            <SoundfontProvider
              instrumentName="acoustic_grand_piano"
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <PianoWithRecording
                  className="container"
                  recording={this.state.recording}
                  setRecording={this.setRecording}
                  noteRange={noteRange}
                  width={800}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  keyboardShortcuts={keyboardShortcuts}
                />
              )}
            />
          </div>
          <div className="mt-5">
            <button onClick={this.onClickPlay}>Play!</button>
            <button onClick={this.onClickNext}>
              I'm ready to try on my own
            </button>
            <button onClick={() => this.setState({ homePage: true })}>
              Home
            </button>
          </div>

        </div>
      </Fragment>
    );
  };



  renderStageSynthesizer = () => {
    return (
        <Fragment>
            <Oscillator className="synthesizer">
            </Oscillator>
            <div className="mt-5">

              <button onClick={() => this.setState({ homePage: true, synthesizerPage: false })}>
                Home
              </button>

          </div>

        </Fragment>
    );

  };


  updateError = note => {
    if (this.state.stageActive === false) {
      return;
    }
    if (
      this.state.activeNoteLetter !==
      note.getElementsByClassName("ReactPiano__NoteLabel")[0].innerHTML
    ) {
      this.setState({ numErrors: this.state.numErrors + 1 });
    } else {
      this.setState({ numSuccesses: this.state.numSuccesses + 1 });
    }
  };


  showNextButton = () => {
    if (
      this.state.stageEnd &&
      this.state.numErrors < 10 &&
      this.state.numSuccesses >= 10
    ) {

      return (
        <div className="mt-5">
          <h3 className="mb-3">You made it!</h3>
          <button onClick={() => this.setState({ homePage: true})}>
            Home
          </button>
          <button onClick={this.onClickStartHighlights}>Start!</button>
        </div>
      );


    } else {
      return (
        <div className="mt-5">
          <button onClick={this.onClickStartHighlights}>Start!</button>
        </div>
      );
    }
  };


  renderStageNoSound = () => {
    const notes = document.getElementsByClassName(
      "ReactPiano__Keyboard container"
    )[0].children;

    for (let i = 0; i < notes.length; i++) {
      $(notes[i])
        .off()
        .on("click", () => this.updateError(notes[i]));
    }

    return (
      <div className="container">
        <h3>Now it's your turn! tap on the highlighted notes.</h3>
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "780px",
            margin: "auto"
          }}
        >
          <video className="vid" style={{ width: "400px", height: "auto" }}>
            <source src="s00.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="mt-5">
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <PianoWithRecording
                recording={this.state.recording}
                setRecording={this.setRecording}
                className="container"
                noteRange={noteRange}
                width={800}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        </div>
        <div className="mt-5">{this.showNextButton()}</div>
        <div className="mt-5">
          <h3>Errors: {this.state.numErrors}</h3>
          <h3>Successes: {this.state.numSuccesses}/10</h3>
        </div>
      </div>
    );
  };



  home = () => {
    return (
      <div className="container mx-auto">
        <h1 style={{  fontWeight: "bold" }}>
          Piano
        </h1>

        <div className="row">

          <div className="col">
            <div className="card container_card" >
              <img
                style={{ height: "200px" }}
                className="card-img-top mx-auto"
                src="https://i.ytimg.com/vi/9t8pddN5804/maxresdefault.jpg"
                alt="child"
              />
              <div className="card-body">
                <h5 className="card-title">Play Little Jonathan </h5>
                <input
                    type="text"
                  className="btn btn-primary add_button"
                  value="Start"
                  onClick={() =>
                    this.setState({ homePage: false, learnStage: true })
                  }
                />
              </div>

            </div>

          </div>

          <div className="col">
            <div className="card container_card">
              <img
                style={{ height: "200px" }}
                className="card-img-top"
                src="https://wall.bestcarmagz.net/sites/default/files/synthesizer-wallpapers-37411-2186742.png"
                alt="child"
              />
              <div className="card-body">
                <h5 className="card-title">Synthesizer</h5>
                <input
                  type="text"
                  className="btn btn-primary add_button"
                  value="Start"
                  onClick={() =>
                      this.setState({ homePage: false, synthesizerPage: true })
                  }
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };




  renderLearnStage = () => {
    return (
      <div className="container">
        <h3 style={{ fontSize: "20px" }} className="p-4">
          Hi there! These are the song notes. First, press on each note and see
          where it appears on the piano
        </h3>
        <div className="row">
          {this.state.notesArr.map(note => {
            return (
              <div className="col">
                <img
                  style={{ width: "50px", height: "80px" }}
                  className="img-fluid"
                  alt="note"
                  src={note.img}
                />
                <p style={{ color: "white" }}>{note.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <Piano
                className="container"
                noteRange={noteRange}
                width={800}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        </div>
        <button
          className="m-5"
          onClick={() => this.setState({ learnStage: false })}
        >
          I'm Ready!
        </button>
      </div>
    );
  };



  render() {


    if (this.state.homePage) {
      return this.home();
    }
    if (this.state.synthesizerPage){
      return this.renderStageSynthesizer();
    }

    if (this.state.learnStage) {
      return this.renderLearnStage();
    }

    if (!this.state.listened) {
      return this.renderStageWithSound();
    } else {
      return this.renderStageNoSound();
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
