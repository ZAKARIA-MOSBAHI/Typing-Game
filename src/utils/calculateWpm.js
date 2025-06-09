export function calculateWpm(time, Chars) {
  const timeInMinutes = time / 60;
  const words = Chars / 5;
  if (timeInMinutes > 0) {
    const wpm = Math.round(words / timeInMinutes);
    return wpm;
  } else return 0;
}
