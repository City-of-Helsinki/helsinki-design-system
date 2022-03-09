/* hack until fs is not required */
function existsSync() {
  return false;
}

module.exports = {
  existsSync,
};
