function toHHMMSS(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    hours = `${hours}`.padStart(2, "0");
    minutes = `${minutes}`.padStart(2, "0");
    seconds = `${seconds}`.padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
  }

  module.exports = { toHHMMSS }