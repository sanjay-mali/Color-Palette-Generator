const colorCategories = [
  "primary",
  "secondary",
  "accent",
  "text",
  "background",
];

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function generateMonochromatic(color) {
  const rgb = hexToRgb(color);
  const variations = [rgb];
  for (let i = 1; i < 5; i++) {
    const factor = 1 - i * 0.15;
    variations.push({
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor),
    });
  }
  return variations.map((c) => rgbToHex(c.r, c.g, c.b));
}

function generateAnalogous(color) {
  const rgb = hexToRgb(color);
  return [
    color,
    rgbToHex((rgb.r + 30) % 255, (rgb.g + 30) % 255, (rgb.b + 30) % 255),
    rgbToHex((rgb.r + 60) % 255, (rgb.g + 60) % 255, (rgb.b + 60) % 255),
    rgbToHex((rgb.r + 90) % 255, (rgb.g + 90) % 255, (rgb.b + 90) % 255),
    rgbToHex((rgb.r + 120) % 255, (rgb.g + 120) % 255, (rgb.b + 120) % 255),
  ];
}

function generateComplementary(color) {
  const rgb = hexToRgb(color);
  return [
    color,
    rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b),
    rgbToHex((rgb.r + 60) % 255, (rgb.g + 60) % 255, (rgb.b + 60) % 255),
    rgbToHex(
      (255 - rgb.r + 60) % 255,
      (255 - rgb.g + 60) % 255,
      (255 - rgb.b + 60) % 255
    ),
    rgbToHex((rgb.r + 120) % 255, (rgb.g + 120) % 255, (rgb.b + 120) % 255),
  ];
}

function generateSplitComplementary(color) {
  const rgb = hexToRgb(color);
  return [
    color,
    rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b),
    rgbToHex((rgb.r + 120) % 255, rgb.g, (rgb.b + 120) % 255),
    rgbToHex(rgb.r, (rgb.g + 120) % 255, (rgb.b + 120) % 255),
    rgbToHex((rgb.r + 60) % 255, (rgb.g + 60) % 255, (rgb.b + 60) % 255),
  ];
}

function generateTriadic(color) {
  const rgb = hexToRgb(color);
  return [
    color,
    rgbToHex((rgb.r + 120) % 255, rgb.g, (rgb.b + 120) % 255),
    rgbToHex(rgb.r, (rgb.g + 120) % 255, (rgb.b + 120) % 255),
    rgbToHex((rgb.r + 120) % 255, (rgb.g + 120) % 255, rgb.b),
    rgbToHex((rgb.r + 60) % 255, (rgb.g + 60) % 255, (rgb.b + 60) % 255),
  ];
}

function generateBlackVariants() {
  return [
    "#000000",
    "#1A1110",
    "#555D50",
    "#353839",
    "#253529",
    "#362819",
    "#3A3A38",
    "#2E473B",
    "#353F3E",
    "#26282A",
    "#27251F",
    "#040200",
    "#0E0C0A",
    "#080806",
    "#0D0907",
    "#010127",
    "#4D423E",
    "#0B0B0B",
    "#191C27",
    "#0F0404",
    "#151922",
    "#3C4748",
    "#191C20",
    "#050301",
    "#0B0705",
    "#060606",
    "#160D08",
    "#000302",
    "#0A0B0B",
    "#100E09",
    "#020403",
    "#2C2C2A",
    "#0B0510",
    "#343432",
    "#010B13",
    "#004242",
    "#54626F",
    "#BFAFB2",
    "#451425",
    "#354230",
    "#2C1608",
    "#2F4F4F",
    "#333333",
    "#32174D",
    "#3C341F",
  ];
}

function generateWhiteVariants() {
  return [
    "#FFFFFF",
    "#F8F8FF",
    "#F5F5F5",
    "#FEFEFA",
    "#F5FEFD",
    "#FFFFF0",
    "#FFFAF0",
    "#FFF5EE",
    "#FFF8DC",
    "#FDF5E6",
    "#FFFDD0",
    "#F5F5DC",
    "#F1E9D2",
    "#FAEBD7",
    "#F7E7CE",
    "#F0EAD6",
    "#EFDFBB",
    "#E3DAC9",
    "#F3E5AB",
    "#EEDC82",
    "#EDEAE0",
    "#FFFACD",
    "#F3F2ED",
    "#F0EEE4",
    "#FFFAFA",
    "#FDFCFA",
    "#ECF3F9",
    "#F3F0E8",
    "#F8FBF8",
    "#F1F9EC",
    "#F2EBDD",
    "#FFFFE4",
    "#FFFCEC",
    "#F6F1F4",
    "#EBF5F0",
    "#EEEEFF",
    "#EAF4FC",
    "#F8F9F5",
    "#DEDDDB",
    "#EBE4D8",
    "#EFEDE3",
    "#E3DFD2",
    "#EDEFEF",
    "#E7FEFF",
    "#E6E8FA",
    "#E5E4E2",
    "#FFF8E7",
    "#FFEBCD",
    "#FFFFE0",
    "#F8F8F8",
    "#EFECE1",
    "#EDF2F8",
    "#FCFFF9",
    "#F2EFE1",
    "#EDE9DD",
    "#F4F5F0",
    "#E1E1DD",
    "#F1F2EE",
    "#E9EDF6",
    "#F0EDDB",
    "#ECE9E4",
    "#FBF6F0",
    "#EDE6D6",
    "#EDEAE2",
  ];
}
function updateColor(category) {
  const colorPicker = document.getElementById(
    `colorPicker${capitalizeFirstLetter(category)}`
  );
  const color = colorPicker.value;
  document.getElementById(category).style.backgroundColor = color;
  document.documentElement.style.setProperty(`--${category}`, color);
  if (category === "text") {
    document.body.style.color = color;
  } else if (category === "background") {
    document.body.style.backgroundColor = color;
  }
}

function generateColors() {
  const scheme = document.getElementById("colorScheme").value;
  let colors = [];

  switch (scheme) {
    case "monochromatic":
      colors = generateMonochromatic(getRandomColor());
      break;
    case "analogous":
      colors = generateAnalogous(getRandomColor());
      break;
    case "complementary":
      colors = generateComplementary(getRandomColor());
      break;
    case "splitComplementary":
      colors = generateSplitComplementary(getRandomColor());
      break;
    case "triadic":
      colors = generateTriadic(getRandomColor());
      break;
    default:
      colors = [
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
      ];
      break;
  }

  const blackVariants = generateBlackVariants();
  const whiteVariants = generateWhiteVariants();
  const textColors = [...blackVariants];
  const backgroundColors = [...whiteVariants];

  colorCategories.forEach((category, index) => {
    let color;
    if (category === "text") {
      color = textColors[Math.floor(Math.random() * textColors.length)];
    } else if (category === "background") {
      color =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    } else {
      color = colors[index % colors.length];
    }
    document.getElementById(category).style.backgroundColor = color;
    document.getElementById(
      `colorPicker${capitalizeFirstLetter(category)}`
    ).value = color;
    document.documentElement.style.setProperty(`--${category}`, color);
    if (category === "text") {
      document.body.style.color = color;
    } else if (category === "background") {
      document.body.style.backgroundColor = color;
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomPosition() {
  return Math.random() * 100;
}

function getRandomVelocity() {
  return (Math.random() - 0.5) / 20; // Velocity between -1 and 1
}

const heroSection = document.getElementById("boxes");

function createMovingBox(colorClass) {
  const box = document.createElement("div");
  box.classList.add("moving-box", colorClass);
  document.body.appendChild(box);

  let x = getRandomPosition();
  let y = getRandomPosition();
  let vx = getRandomVelocity();
  let vy = getRandomVelocity();

  function move() {
    x += vx;
    y += vy;

    if (x <= 0 || x >= 100) vx *= -1;
    if (y <= 0 || y >= 100) vy *= -1;

    box.style.transform = `translate(${x}vw, ${y}vh)`;
    requestAnimationFrame(move);
  }

  move();
}

const colors = ["primary-box", "secondary-box", "accent-box"];
for (let i = 0; i < 20; i++) {
  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  createMovingBox(colorClass);
}
