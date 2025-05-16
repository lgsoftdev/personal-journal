function setNullIfEmpty(value) {
  if (!value) {
    return null;
  }
  return value;
}

module.exports = { setNullIfEmpty };
