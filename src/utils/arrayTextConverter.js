export default (arrayText) => {
  return arrayText.split(",").map((tech) => tech.trim());
};
