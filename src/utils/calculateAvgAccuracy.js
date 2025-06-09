export function calculateAvgAccuracy(scoreBoard) {
  const sumOfCorrectChars = scoreBoard.reduce(
    (sum, s) => sum + s.correctChars,
    0
  );
  const typedChars = scoreBoard[scoreBoard.length - 1].typedChars;

  return Math.round((sumOfCorrectChars / typedChars) * 100);
}
