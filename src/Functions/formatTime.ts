function formatTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time %= 3600) / 60);
  const seconds = Math.floor(time % 60);

  return [hours, minutes, seconds]
    .map((i) => (i < 10 ? "0" + i : i))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}

export default formatTime;
