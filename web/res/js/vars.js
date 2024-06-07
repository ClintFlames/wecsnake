/**
 * @param {string} hex - hex color.
 * @returns {number}
 */
const parseHex = (hex) => {
  if (hex.startsWith("#")) hex = hex.slice(1);

  switch (hex.length) {
    case 3: hex = hex.charAt(0).repeat(2) + hex.charAt(1).repeat(2) + hex.charAt(2).repeat(2); break;
    case 6: break;
    case _: throw `Invalid value: ${hex}`;
  }

  return Number.parseInt(hex, 16);
};

const bodyStyle = window.getComputedStyle(document.body);

export const palette = {
  color: bodyStyle.getPropertyValue("--color") || "#FFF",
  backgroundColor: bodyStyle.getPropertyValue("--background-color") || "#222228",
  foodColor: bodyStyle.getPropertyValue("--food-color") || "#4F4",
  snakeHeadColor: bodyStyle.getPropertyValue("--snake-head-color") || "#F8F",
  snakeColor: bodyStyle.getPropertyValue("--snake-color") || "#F4F",
  wallColor: bodyStyle.getPropertyValue("--wall-color") || "#977",
}

export const hexPalette = {
  color: parseHex(palette.color),
  backgroundColor: parseHex(bodyStyle.getPropertyValue("--background-color") || "#222228"),
  foodColor: parseHex(bodyStyle.getPropertyValue("--food-color") || "#4F4"),
  snakeHeadColor: parseHex(bodyStyle.getPropertyValue("--snake-head-color") || "#F8F"),
  snakeColor: parseHex(bodyStyle.getPropertyValue("--snake-color") || "#F4F"),
  wallColor: parseHex(bodyStyle.getPropertyValue("--wall-color") || "#977"),
}
