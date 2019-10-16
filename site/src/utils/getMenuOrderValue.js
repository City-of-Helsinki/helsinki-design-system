const isPositiveOrZero = val => typeof val === "number" && val > -1;

export default val => (isPositiveOrZero(val) ? val : Number.MAX_SAFE_INTEGER);
