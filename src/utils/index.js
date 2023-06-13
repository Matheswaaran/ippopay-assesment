export const getAvailableTypes = (password) => {
  let numeric = /[a-z]/.test(password) ? 1 : 0;
  let uppercase = /[A-Z]/.test(password) ? 1 : 0;
  let lowercase = /[0-9]/.test(password) ? 1 : 0;

  return numeric + uppercase + lowercase;
};

export const findMinRec = (arr, i, sumCalculated, sumTotal) => {
  if (i === 0) return Math.abs(sumTotal - sumCalculated - sumCalculated);

  return Math.min(
    findMinRec(arr, i - 1, sumCalculated + arr[i - 1], sumTotal),
    findMinRec(arr, i - 1, sumCalculated, sumTotal)
  );
};

export const findMin = (arr, n) => {
  let sumTotal = arr.reduce((curr, acc) => curr + acc, 0);
  return findMinRec(arr, n, 0, sumTotal);
};
