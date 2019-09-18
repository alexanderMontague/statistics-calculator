const setUpCalculations = observations => {
  const parsedObservations = observations.filter(
    num => !isNaN(num) && num.length !== 0
  );
  const length = parsedObservations.length;
  const mean =
    parsedObservations.reduce((acc, num) => acc + Number(num), 0) / length;
  return [parsedObservations, length, mean];
};

export const sampleVariance = rawObservations => {
  const [observations, length, mean] = setUpCalculations(rawObservations);

  const variance =
    observations.reduce(
      (acc, num) => acc + Math.pow(Number(num) - mean, 2),
      0
    ) /
    (length - 1);

  return [variance, Math.sqrt(variance)];
};

export const meanAvgDeviation = rawObservations => {
  const [observations, length, mean] = setUpCalculations(rawObservations);

  const MAD =
    observations.reduce((acc, num) => acc + Math.abs(num - mean), 0) / length;

  return MAD;
};

export const zScore = (observationVal, rawObservations) => {
  const [observations, noop1, mean] = setUpCalculations(rawObservations);
  const [noop2, standardDeviation] = sampleVariance(observations);

  return (observationVal - mean) / standardDeviation;
};

export const meanMedianMode = (rawObservations, outliers) => {
  outliers = outliers.filter(num => !isNaN(num) && num.length !== 0);
  console.log(outliers, 1);
  const [observations, length, mean] = setUpCalculations(rawObservations);

  let sortedObservations = observations.sort((a, b) => a < b);
  sortedObservations = sortedObservations.filter(
    num => !outliers.includes(num)
  );

  const median =
    length % 2 !== 0
      ? sortedObservations[Math.floor(length / 2)]
      : (Number(sortedObservations[length / 2 - 1]) +
          Number(sortedObservations[length / 2])) /
        2;

  const modeMap = {};
  let modeArr = [];
  let currMax = 0;

  // tally all occurances
  for (let i = 0; i < length; i++) {
    modeMap[observations[i]] = !modeMap[observations[i]]
      ? 1
      : modeMap[observations[i]] + 1;

    // keep track of highest occurance in case of multiple modes
    if (modeMap[observations[i]] > currMax) {
      currMax = modeMap[observations[i]];
    }
  }

  // grab modes
  for (let num in modeMap) {
    if (modeMap[num] === currMax) {
      modeArr.push(num);
    }
  }

  if (currMax === 1) {
    modeArr = ["No Mode"];
  }

  console.log(mean, median, modeArr);

  return [mean, median, modeArr];
};
