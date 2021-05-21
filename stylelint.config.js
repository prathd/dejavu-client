module.exports = {
  extends: ["stylelint-config-recommended"],
  ignoreFiles: ["static/**"],
  rules: {
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["overlay"],
      },
    ],
  },
};
