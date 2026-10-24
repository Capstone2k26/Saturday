// ai-robot-full.forge.js
// ------------------------------------------------------------------
// Full concept/blockout model — AI Personal Assistant Robot (ESP32-S3)
// ------------------------------------------------------------------
// This follows ForgeCAD's own "blockout model" style: believable
// proportions built from simple primitives (box/cylinder/sphere),
// not exact manufacturing tolerances. Great for checking the overall
// look/scale before you tighten up any one part (like the chassis
// script from before) into a real, dimension-accurate component.
//
// Run with:
//   forgecad run ai-robot-full.forge.js
//   forgecad studio .                         (drag the sliders live)
//   forgecad render 3d ai-robot-full.forge.js
//   forgecad export stl ai-robot-full.forge.js
//   forgecad export step ai-robot-full.forge.js
//
// Coordinate system: +X = front, +Y = left, +Z = up. Ground = Z0.
// ------------------------------------------------------------------

// ===================== PARAMETERS =====================

// --- Chassis deck ---
const deckLength   = Param.number("Deck Length", 250, { min: 150, max: 350, unit: "mm" });
const deckWidth    = Param.number("Deck Width", 180, { min: 120, max: 260, unit: "mm" });
const deckThickness= Param.number("Deck Thickness", 4, { min: 2, max: 8, unit: "mm" });

// --- Wheels & motors ---
const wheelRadius  = Param.number("Wheel Radius", 35, { min: 20, max: 55, unit: "mm" });
const wheelWidth   = Param.number("Wheel Width", 26, { min: 10, max: 40, unit: "mm" });
const wheelXOffset = Param.number("Wheel X Offset", -55, { min: -120, max: 60, unit: "mm" });
const motorBodyLen = Param.number("Motor Body Length", 45, { min: 20, max: 70, unit: "mm" });
const motorBodyDia = Param.number("Motor Body Diameter", 24, { min: 12, max: 36, unit: "mm" });

// --- Caster (front balance wheel) ---
const casterRadius = Param.number("Caster Radius", 14, { min: 8, max: 25, unit: "mm" });
const casterXOffset= Param.number("Caster X Offset", 100, { min: 40, max: 140, unit: "mm" });

// --- Battery ---
const batteryLength= Param.number("Battery Length", 110, { min: 60, max: 160, unit: "mm" });
const batteryWidth = Param.number("Battery Width", 40, { min: 20, max: 70, unit: "mm" });
const batteryHeight= Param.number("Battery Height", 25, { min: 10, max: 40, unit: "mm" });
const batteryXOffset = Param.number("Battery X Offset", -25, { min: -100, max: 60, unit: "mm" });

// --- Mast (connects chassis to display head) ---
const mastHeight   = Param.number("Mast Height", 90, { min: 40, max: 160, unit: "mm" });
const mastRadius   = Param.number("Mast Radius", 8, { min: 4, max: 16, unit: "mm" });
const mastXOffset  = Param.number("Mast X Offset", 25, { min: -60, max: 80, unit: "mm" });

// --- Display head ---
const headWidth    = Param.number("Head Width", 110, { min: 60, max: 160, unit: "mm" });
const headDepth    = Param.number("Head Depth", 35, { min: 15, max: 60, unit: "mm" });
const headHeight   = Param.number("Head Height", 95, { min: 50, max: 150, unit: "mm" });
const screenWidth  = Param.number("Screen Width", 75, { min: 30, max: 130, unit: "mm" });
const screenHeight = Param.number("Screen Height", 60, { min: 25, max: 120, unit: "mm" });

// --- Mic, RGB ring, speaker ---
const micRadius    = Param.number("Mic Radius", 9, { min: 4, max: 18, unit: "mm" });
const micHeight    = Param.number("Mic Height", 10, { min: 4, max: 20, unit: "mm" });
const ringOuterRadius = Param.number("RGB Ring Outer Radius", 62, { min: 30, max: 100, unit: "mm" });
const ringInnerRadius = Param.number("RGB Ring Inner Radius", 55, { min: 20, max: 95, unit: "mm" });
const ringHeight   = Param.number("RGB Ring Height", 8, { min: 3, max: 16, unit: "mm" });
const speakerRadius= Param.number("Speaker Radius", 22, { min: 10, max: 40, unit: "mm" });
const speakerDepth = Param.number("Speaker Depth", 6, { min: 3, max: 12, unit: "mm" });

// --- Ultrasonic sensors (front of chassis) ---
const sensorRadius = Param.number("Ultrasonic Sensor Radius", 8, { min: 4, max: 14, unit: "mm" });
const sensorDepth  = Param.number("Ultrasonic Sensor Depth", 6, { min: 3, max: 12, unit: "mm" });
const sensorSpacing= Param.number("Ultrasonic Sensor Spacing", 40, { min: 20, max: 70, unit: "mm" });

// ===================== HELPERS =====================

function centered(shape) {
  return shape.placeReference("center", [0, 0, 0]);
}

// ===================== CHASSIS =====================

const chassis = box(deckLength, deckWidth, deckThickness)
  .placeReference("center", [0, 0, deckThickness / 2])
  .color("#5f87c6");

const deckTopZ = deckThickness;

// --- Wheels (left +Y, right -Y), axle along Y ---
function makeWheel(sideSign) {
  const y = sideSign * (deckWidth / 2 + wheelWidth * 0.15);
  return centered(cylinder(wheelWidth, wheelRadius))
    .rotateX(90)
    .translate(wheelXOffset, y, wheelRadius)
    .color("#202124");
}
const leftWheel  = makeWheel(1);
const rightWheel = makeWheel(-1);

// --- Motor bodies (small cylinders inboard of each wheel) ---
function makeMotor(sideSign) {
  const y = sideSign * (deckWidth / 2 - motorBodyLen / 2 - 6);
  return centered(cylinder(motorBodyLen, motorBodyDia / 2))
    .rotateX(90)
    .translate(wheelXOffset, y, wheelRadius)
    .color("#c0392b");
}
const leftMotor  = makeMotor(1);
const rightMotor = makeMotor(-1);

// --- Front caster / ball wheel ---
const caster = centered(sphere(casterRadius))
  .translate(casterXOffset, 0, casterRadius)
  .color("#4a4a4a");

// --- Battery pack ---
const battery = box(batteryLength, batteryWidth, batteryHeight)
  .placeReference("center", [batteryXOffset, 0, deckTopZ + batteryHeight / 2])
  .color("#1c1c1c");

// --- ESP32-S3 devkit + motor driver, small representative boards ---
const esp32Board = box(52, 28, 6)
  .placeReference("center", [10, 40, deckTopZ + 3])
  .color("#0a5c36");

const motorDriverBoard = box(24, 20, 5)
  .placeReference("center", [10, -40, deckTopZ + 2.5])
  .color("#b03a2e");

// ===================== MAST =====================

const mast = centered(cylinder(mastHeight, mastRadius))
  .translate(mastXOffset, 0, deckTopZ + mastHeight / 2)
  .color("#8a8a8a");

const headBottomZ = deckTopZ + mastHeight;

// ===================== DISPLAY HEAD =====================

const headCenterZ = headBottomZ + headHeight / 2;

const headBody = box(headDepth, headWidth, headHeight)
  .placeReference("center", [mastXOffset, 0, headCenterZ])
  .color("#1f2430");

// --- Screen face, inset on the front of the head ---
const screen = box(2, screenWidth, screenHeight)
  .placeReference("center", [
    mastXOffset + headDepth / 2 + 1,
    0,
    headCenterZ + headHeight * 0.08,
  ])
  .color("#3b8dd6");

// --- Mic capsule, top of head ---
const mic = centered(cylinder(micHeight, micRadius))
  .translate(mastXOffset, 0, headBottomZ + headHeight + micHeight / 2)
  .color("#111111");

// --- RGB LED ring, around the base of the head ---
const ringOuter = centered(cylinder(ringHeight, ringOuterRadius));
const ringInner = centered(cylinder(ringHeight * 3, ringInnerRadius));
const rgbRing = ringOuter
  .subtract(ringInner)
  .rotateY(90)
  .translate(mastXOffset, 0, headBottomZ + ringHeight / 2)
  .color("#00e5ff");

// --- Speaker grille, lower front of head ---
const speaker = centered(cylinder(speakerDepth, speakerRadius))
  .rotateY(90)
  .translate(
    mastXOffset + headDepth / 2 + speakerDepth / 2,
    0,
    headCenterZ - headHeight * 0.32
  )
  .color("#2b2b2b");

// ===================== ULTRASONIC SENSORS (front bumper) =====================

function makeSensor(sideSign) {
  return centered(cylinder(sensorDepth, sensorRadius))
    .rotateY(90)
    .translate(
      deckLength / 2 - sensorDepth / 2,
      sideSign * sensorSpacing / 2,
      deckTopZ + sensorRadius + 4
    )
    .color("#b8b8b8");
}
const leftSensor  = makeSensor(1);
const rightSensor = makeSensor(-1);

// ===================== REFERENCE DIMENSIONS =====================

dim([0, 0, 0], [deckLength, 0, 0], { label: "Deck Length" });
dim([0, 0, 0], [0, deckWidth, 0], { label: "Deck Width", offset: 14 });
dim([mastXOffset, 0, 0], [mastXOffset, 0, headBottomZ + headHeight], {
  label: "Overall Height",
  offset: 20,
});

// ===================== RETURN NAMED PARTS =====================

return [
  { name: "Chassis Deck", shape: chassis },
  { name: "Left Wheel", shape: leftWheel },
  { name: "Right Wheel", shape: rightWheel },
  { name: "Left Motor", shape: leftMotor },
  { name: "Right Motor", shape: rightMotor },
  { name: "Front Caster", shape: caster },
  { name: "Battery Pack", shape: battery },
  { name: "ESP32-S3 Board", shape: esp32Board },
  { name: "Motor Driver Board", shape: motorDriverBoard },
  { name: "Mast", shape: mast },
  { name: "Display Head", shape: headBody },
  { name: "Screen", shape: screen },
  { name: "Microphone", shape: mic },
  { name: "RGB LED Ring", shape: rgbRing },
  { name: "Speaker", shape: speaker },
  { name: "Left Ultrasonic Sensor", shape: leftSensor },
  { name: "Right Ultrasonic Sensor", shape: rightSensor },
];