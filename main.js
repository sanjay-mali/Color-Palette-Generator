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
    "#111111",
    "#222222",
    "#333333",
    "#444444",
    "#555555",
    "#666666",
    "#777777",
    "#888888",
    "#999999",
    "#AAAAAA",
    "#BBBBBB",
    "#CCCCCC",
    "#DDDDDD",
    "#EEEEEE",
  ];
}

function generateWhiteVariants() {
  return [
    "#FFFFFF",
    "#F5F5F5",
    "#EBEBEB",
    "#E0E0E0",
    "#D6D6D6",
    "#CCCCCC",
    "#C2C2C2",
    "#B8B8B8",
    "#ADADAD",
    "#A3A3A3",
    "#999999",
    "#8F8F8F",
    "#858585",
    "#7A7A7A",
    "#707070",
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
  return `${Math.random() * 100}vh`;
}

function getRandomDuration() {
  return `${Math.random() * 20 + 5}s`;
}

function createMovingBox(colorClass) {
  const box = document.createElement("div");
  box.classList.add("moving-box", colorClass);
  box.style.setProperty("--start-x", getRandomPosition());
  box.style.setProperty("--start-y", getRandomPosition());
  box.style.setProperty("--end-x", getRandomPosition());
  box.style.setProperty("--end-y", getRandomPosition());
  box.style.animationDuration = getRandomDuration();
  document.body.appendChild(box);
}
const colors = ["primary-box", "secondary-box", "accent-box"];
for (let i = 0; i < 8; i++) {
  const colorClass = colors[i % colors.length];
  createMovingBox(colorClass);
}
