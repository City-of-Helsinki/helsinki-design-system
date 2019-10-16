module.exports = {
  hooks: {
    "pre-commit": "yarn run husky:pre-commit",
    "pre-push": "yarn run husky:pre-push"
  }
};
