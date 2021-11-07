function getBrazilDate() {
  const date = new Date();
  return new Date(date.toUTCString().replace("GMT", "GMT+3:00"));
}

module.exports = {
  getBrazilDate,
};
