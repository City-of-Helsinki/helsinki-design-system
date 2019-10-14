module.exports = {
  hooks: {
    "pre-commit": "lerna run --concurrency 1 --stream pre-commit"
  }
};
