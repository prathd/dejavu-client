/**
 * There's an issue with filenames that start with square brackets:
 *   https://github.com/okonet/lint-staged/issues/676
 *   Solution adapted from https://github.com/zeit/next.js/blob/canary/lint-staged.config.js
 */

const escape = require("shell-quote").quote;

const isWin = process.platform === "win32";

module.exports = {
  "{pages,components}/**/*.{js,jsx,ts,tsx,html}": filenames => {
    const escapedFileNames = filenames
      .map(filename => `"${isWin ? filename : escape([filename])}"`)
      .join(" ");

    return [
      `eslint --fix ${filenames.map(f => `"${f}"`).join(" ")}`,
      `prettier --write ${escapedFileNames}`,
      `stylelint ${escapedFileNames} --allow-empty-input`,
      `git add ${escapedFileNames}`,
    ];
  },
  "{components,graphql,layouts,lib,pages,shared,static,styles}/**/*.{js,ts,tsx,md}": [
    "prettier --write",
    "stylelint",
    "git add",
  ],
};
