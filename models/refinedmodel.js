
/*
 * JARVIS AI SCOUT ROVER
 * Redesigned futuristic body
 *
 * +X = Front
 * +Y = Left
 * +Z = Up
 */

// ================= PARAMETERS =================

const deckLength = Param.number("Chassis Length", 150, 120, 190);
const deckWidth = Param.number("Chassis Width", 112, 90, 145);
const deckThickness = Param.number("Chassis Thickness", 12, 8, 18);

const wheelRadius = Param.number("Wheel Radius", 32, 25, 40);
const wheelWidth = Param.number("Wheel Width", 16, 10, 22);

const headWidth = Param.number("Head Width", 76, 60, 95);
const headHeight = Param.number("Head Height", 62, 45, 80);
const headDepth = Param.number("Head Depth", 48, 35, 65);

const screenWidth = Param.number("Screen Width", 48, 35, 60);
const screenHeight = Param.number("Screen Height", 30, 20, 40);

const mastHeight = Param.number("Mast Height", 30, 20, 45);

// ================= COLORS =================

const armor = "#263746";
const armorLight = "#43586A";
const dark = "#111820";
const cyan = "#00D9FF";
const metal = "#9AAAB7";
const screenColor = "#071B2A";
const tireColor = "#17191D";
const pcbColor = "#176B45";

// ================= HELPER =================

function centered(shape) {
    return shape.placeReference("center", [0, 0, 0]);
}

// ================= CHASSIS =================

const lowerChassis = centered(
    box(deckLength, deckWidth, deckThickness)
).translate(0, 0, 35).color(dark);

const upperDeck = centered(
    box(deckLength - 12, deckWidth - 10, 12)
).translate(-3, 0, 47).color(armor);

const frontArmor = centered(
    box(34, deckWidth - 18, 10)
).translate(deckLength / 2 - 20, 0, 43).color(armorLight);

const frontArmorTop = centered(
    box(22, deckWidth - 28, 8)
).translate(deckLength / 2 - 17, 0, 51).color(armor);

const rearCover = centered(
    box(58, deckWidth - 24, 9)
).translate(-deckLength / 2 + 34, 0, 55).color(armorLight);

// Side armor panels
const leftSideArmor = centered(
    box(deckLength - 28, 5, 23)
).translate(0, deckWidth / 2 - 3, 25).color(armor);

const rightSideArmor = centered(
    box(deckLength - 28, 5, 23)
).translate(0, -deckWidth / 2 + 3, 25).color(armor);

// Side lighting
const leftLightStrip = centered(
    box(48, 2, 3)
).translate(12, deckWidth / 2 + 1, 31).color(cyan);

const rightLightStrip = centered(
    box(48, 2, 3)
).translate(12, -deckWidth / 2 - 1, 31).color(cyan);

// ================= WHEELS =================

const wheelX = -5;
const wheelY = deckWidth / 2 + wheelWidth / 2 - 2;
const wheelZ = wheelRadius + 3;

const leftWheel = centered(
    cylinder(wheelRadius, wheelWidth)
).rotateX(90).translate(wheelX, wheelY, wheelZ).color(tireColor);

const rightWheel = centered(
    cylinder(wheelRadius, wheelWidth)
).rotateX(90).translate(wheelX, -wheelY, wheelZ).color(tireColor);

// Wheel hubs
const leftHub = centered(
    cylinder(wheelRadius * 0.48, wheelWidth + 1)
).rotateX(90).translate(wheelX, wheelY, wheelZ).color(metal);

const rightHub = centered(
    cylinder(wheelRadius * 0.48, wheelWidth + 1)
).rotateX(90).translate(wheelX, -wheelY, wheelZ).color(metal);

const leftHubCap = centered(
    cylinder(wheelRadius * 0.22, wheelWidth + 2)
).rotateX(90).translate(wheelX, wheelY, wheelZ).color(cyan);

const rightHubCap = centered(
    cylinder(wheelRadius * 0.22, wheelWidth + 2)
).rotateX(90).translate(wheelX, -wheelY, wheelZ).color(cyan);

// Motor housings
const leftMotor = centered(
    box(38, 18, 22)
).translate(wheelX, wheelY - 12, wheelZ).color(metal);

const rightMotor = centered(
    box(38, 18, 22)
).translate(wheelX, -wheelY + 12, wheelZ).color(metal);

// ================= REAR CASTER =================

const casterMount = centered(
    box(25, 25, 10)
).translate(-deckLength / 2 + 18, 0, 23).color(metal);

const casterWheel = centered(
    sphere(10)
).translate(-deckLength / 2 + 18, 0, 12).color(tireColor);

// ================= BATTERY =================

const battery = centered(
    box(64, 48, 20)
).translate(-18, 0, 18).color("#343B43");

const batteryStrap = centered(
    box(12, 51, 22)
).translate(-18, 0, 19).color(metal);

// ================= ELECTRONICS =================

const espBoard = centered(
    box(48, 28, 3)
).translate(-18, 0, 61).color(pcbColor);

const espModule = centered(
    box(18, 20, 4)
).translate(-18, 0, 65).color(metal);

const motorDriver = centered(
    box(28, 22, 3)
).translate(-48, 0, 61).color(pcbColor);

// ================= HEAD SUPPORT =================

const mast = centered(
    box(20, 22, mastHeight)
).translate(12, 0, 60 + mastHeight / 2).color(dark);

const neckAccent = centered(
    cylinder(13, 3)
).translate(12, 0, 60 + mastHeight).color(cyan);

// ================= ROBOT HEAD =================

const headZ = 60 + mastHeight + headHeight / 2;

const headShell = centered(
    box(headDepth, headWidth, headHeight)
).translate(18, 0, headZ).color(armor);

const headTopArmor = centered(
    box(headDepth - 8, headWidth - 8, 7)
).translate(18, 0, headZ + headHeight / 2 - 2).color(armorLight);

// Screen bezel and display face the front (+X)
const screenBezel = centered(
    box(5, screenWidth + 10, screenHeight + 10)
).translate(18 + headDepth / 2 + 1, 0, headZ).color(dark);

const display = centered(
    box(2, screenWidth, screenHeight)
).translate(18 + headDepth / 2 + 4, 0, headZ).color(screenColor);

const headStatusLight = centered(
    box(3, 18, 3)
).translate(18 + headDepth / 2 + 4, 0, headZ + screenHeight / 2 + 9).color(cyan);

const leftHeadAccent = centered(
    box(18, 2, 4)
).translate(18, headWidth / 2 + 1, headZ - 12).color(cyan);

const rightHeadAccent = centered(
    box(18, 2, 4)
).translate(18, -headWidth / 2 - 1, headZ - 12).color(cyan);

// ================= MICROPHONE =================

const microphone = centered(
    cylinder(5, 7)
).translate(10, 0, headZ + headHeight / 2 + 7).color(dark);

const micGrille = centered(
    sphere(3)
).translate(10, 0, headZ + headHeight / 2 + 12).color(metal);

// ================= SPEAKER =================

const speakerHousing = centered(
    cylinder(12, 5)
).rotateY(90).translate(deckLength / 2 - 18, 0, 28).color(dark);

const speakerCenter = centered(
    cylinder(5, 6)
).rotateY(90).translate(deckLength / 2 - 14, 0, 28).color(metal);

// ================= ULTRASONIC SENSORS =================

const sensorX = deckLength / 2 + 1;
const sensorY = 22;
const sensorZ = 34;

const leftSensorHousing = centered(
    cylinder(9, 6)
).rotateY(90).translate(sensorX, sensorY, sensorZ).color(dark);

const leftSensor = centered(
    cylinder(6, 7)
).rotateY(90).translate(sensorX + 4, sensorY, sensorZ).color(metal);

const rightSensorHousing = centered(
    cylinder(9, 6)
).rotateY(90).translate(sensorX, -sensorY, sensorZ).color(dark);

const rightSensor = centered(
    cylinder(6, 7)
).rotateY(90).translate(sensorX + 4, -sensorY, sensorZ).color(metal);

// ================= LIGHT BARS =================

const frontLightBar = centered(
    box(3, 42, 4)
).translate(deckLength / 2 - 2, 0, 48).color(cyan);

const rearLightBar = centered(
    box(3, 28, 3)
).translate(-deckLength / 2 + 2, 0, 52).color(cyan);

// ================= RETURN MODEL =================

return [
    { name: "Lower Chassis", shape: lowerChassis },
    { name: "Upper Deck", shape: upperDeck },
    { name: "Front Armor", shape: frontArmor },
    { name: "Front Armor Top", shape: frontArmorTop },
    { name: "Rear Cover", shape: rearCover },
    { name: "Left Side Armor", shape: leftSideArmor },
    { name: "Right Side Armor", shape: rightSideArmor },
    { name: "Left Light Strip", shape: leftLightStrip },
    { name: "Right Light Strip", shape: rightLightStrip },

    { name: "Left Wheel", shape: leftWheel },
    { name: "Right Wheel", shape: rightWheel },
    { name: "Left Wheel Hub", shape: leftHub },
    { name: "Right Wheel Hub", shape: rightHub },
    { name: "Left Hub Cap", shape: leftHubCap },
    { name: "Right Hub Cap", shape: rightHubCap },
    { name: "Left Motor", shape: leftMotor },
    { name: "Right Motor", shape: rightMotor },
    { name: "Caster Mount", shape: casterMount },
    { name: "Caster Wheel", shape: casterWheel },

    { name: "Battery", shape: battery },
    { name: "Battery Strap", shape: batteryStrap },
    { name: "ESP32-S3 Board", shape: espBoard },
    { name: "ESP32 Module", shape: espModule },
    { name: "Motor Driver", shape: motorDriver },

    { name: "Head Mast", shape: mast },
    { name: "Neck Accent", shape: neckAccent },
    { name: "Head Shell", shape: headShell },
    { name: "Head Top Armor", shape: headTopArmor },
    { name: "Screen Bezel", shape: screenBezel },
    { name: "Display", shape: display },
    { name: "Head Status Light", shape: headStatusLight },
    { name: "Left Head Accent", shape: leftHeadAccent },
    { name: "Right Head Accent", shape: rightHeadAccent },

    { name: "Microphone", shape: microphone },
    { name: "Microphone Grille", shape: micGrille },
    { name: "Speaker Housing", shape: speakerHousing },
    { name: "Speaker Center", shape: speakerCenter },

    { name: "Left Sensor Housing", shape: leftSensorHousing },
    { name: "Left Ultrasonic Sensor", shape: leftSensor },
    { name: "Right Sensor Housing", shape: rightSensorHousing },
    { name: "Right Ultrasonic Sensor", shape: rightSensor },

    { name: "Front Light Bar", shape: frontLightBar },
    { name: "Rear Light Bar", shape: rearLightBar }
];
