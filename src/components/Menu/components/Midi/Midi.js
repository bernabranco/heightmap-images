import React, { useEffect, useState } from "react";

// create Midi and map table knobs to use in project
export default function Midi() {
  const [knob1, setKnob1] = useState(0);
  const [knob2, setKnob2] = useState(0);
  const [knob3, setKnob3] = useState(0);
  const [knob4, setKnob4] = useState(0);
  const [knob5, setKnob5] = useState(0);
  const [knob6, setKnob6] = useState(0);
  const [knob7, setKnob7] = useState(0);
  const [knob8, setKnob8] = useState(0);
  const [knob9, setKnob9] = useState(127);
  const [knob10, setKnob10] = useState(127);
  const [knob11, setKnob11] = useState(127);
  const [knob12, setKnob12] = useState(0);
  const [knob13, setKnob13] = useState(0);
  const [knob14, setKnob14] = useState(0);
  const [knob15, setKnob15] = useState(0);
  const [knob16, setKnob16] = useState(0);
  const [knob17, setKnob17] = useState(0);
  const [knob18, setKnob18] = useState(0);
  const [knob19, setKnob19] = useState(0);
  const [knob20, setKnob20] = useState(0);
  const [knob21, setKnob21] = useState(0);
  const [knob22, setKnob22] = useState(0);

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, []);

  function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
  }

  function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
  }

  function getMIDIMessage(midiMessage) {
    var command = midiMessage.data[0];
    var note = midiMessage.data[1];
    var velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
    console.log("command " + command);
    console.log("note " + note);

    // filter data by knobs
    if (note === 16) {
      setKnob1(velocity);
    }
    if (note === 17) {
      setKnob2(velocity);
    }
    if (note === 18) {
      setKnob3(velocity);
    }
    if (note === 19) {
      setKnob4(velocity);
    }
    if (note === 20) {
      setKnob5(velocity);
    }
    if (note === 21) {
      setKnob6(velocity);
    }
    if (note === 22) {
      setKnob7(velocity);
    }
    if (note === 23) {
      setKnob8(velocity);
    }
    if (note === 24) {
      setKnob9(velocity);
    }
    if (note === 25) {
      setKnob10(velocity);
    }
    if (note === 26) {
      setKnob11(velocity);
    }
    if (note === 27) {
      setKnob12(velocity);
    }
    if (note === 28) {
      setKnob13(velocity);
    }
    if (note === 29) {
      setKnob14(velocity);
    }
    if (note === 30) {
      setKnob15(velocity);
    }
    if (note === 31) {
      setKnob16(velocity);
    }
    if (note === 46) {
      setKnob17(velocity);
    }
    if (note === 47) {
      setKnob18(velocity);
    }
    if (note === 48) {
      setKnob19(velocity);
    }
    if (note === 49) {
      setKnob20(velocity);
    }
    if (note === 50) {
      setKnob21(velocity);
    }
  }

  const knobStyle = {
    width: "3rem",
    height: "auto",
    color: "white",
    top: "20rem",
    boxSizing: "border-box",
    padding: "0.5rem",
    backgroundColor: "black",
    borderStyle: "solid",
    borderRadius: "0.5rem",
    borderColor: "rgba(100,100,100,1)",
    borderWidth: "1px",
    fontSize: "0.8rem",
    display: "flex",
    justifyContent: "center",
    margin: "0.3rem",
  };

  let knobs = [];
  for (let i = 0; i < 21; i++) {
    knobs.push(i);
  }

  const knobList = knobs.map((knobs, i) => {
    return (
      <>
        <div>{i}</div>
        <div id={`knob${i}`} style={knobStyle}>
          {knob1}
        </div>
      </>
    );
  });

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "20rem",
          zIndex: 10,
          margin: "10px",
          marginTop: "15px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div id="knob1" style={knobStyle}>
          {knob1}
        </div>
        <div id="knob2" style={knobStyle}>
          {knob2}
        </div>
        <div id="knob3" style={knobStyle}>
          {knob3}
        </div>
        <div id="knob4" style={knobStyle}>
          {knob4}
        </div>
        <div id="knob5" style={knobStyle}>
          {knob5}
        </div>
        <div id="knob6" style={knobStyle}>
          {knob6}
        </div>
        <div id="knob7" style={knobStyle}>
          {knob7}
        </div>
        <div id="knob8" style={knobStyle}>
          {knob8}
        </div>
        <div id="knob9" style={knobStyle}>
          {knob9}
        </div>
        <div id="knob10" style={knobStyle}>
          {knob10}
        </div>
        <div id="knob11" style={knobStyle}>
          {knob11}
        </div>
        <div id="knob12" style={knobStyle}>
          {knob12}
        </div>
        <div id="knob13" style={knobStyle}>
          {knob13}
        </div>
        <div id="knob14" style={knobStyle}>
          {knob14}
        </div>
        <div id="knob15" style={knobStyle}>
          {knob15}
        </div>
        <div id="knob16" style={knobStyle}>
          {knob16}
        </div>
        <div id="knob17" style={knobStyle}>
          {knob17}
        </div>
        <div id="knob18" style={knobStyle}>
          {knob18}
        </div>
        <div id="knob19" style={knobStyle}>
          {knob19}
        </div>
        <div id="knob20" style={knobStyle}>
          {knob20}
        </div>
        <div id="knob21" style={knobStyle}>
          {knob21}
        </div>
        <div id="knob22" style={knobStyle}>
          {knob22}
        </div>
      </div>
    </>
  );
}
