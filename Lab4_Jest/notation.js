function mean(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return 0;
  }
  const total = scores.reduce((sum, val) => sum + val, 0);
  return total / scores.length;
}

module.exports = { mean };
