export const sampleVariance = observations => {
  observations = observations.filter(num => !isNaN(num) && num.length !== 0);
  const length = observations.length;
  const mean = observations.reduce((acc, num) => acc + Number(num), 0) / length;

  const variance =
    observations.reduce(
      (acc, num) => acc + Math.pow(Number(num) - mean, 2),
      0
    ) /
    (length - 1);

  return [variance, Math.sqrt(variance)];
};
