function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const durationString = `${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${remainingSeconds.toString().padStart(2, "0")}s`;

  return durationString;
}

// Example usage:
// console.log(formatDuration(3665)); // Output: 01h 01m 05s
module.exports = formatDuration;
