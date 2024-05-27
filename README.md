# Avocado

A simplified interface to the MongoDB Node.js driver with best practices built in.

## Publishing the npm Package

(This should be a GitHub workflow eventually.)

1. Bump the version number in the root `package.json` as needed.
2. `npm run build:prod`
3. Verify that the files in the `dist/` directory look correct and no sensitive data is included.
4. `cd dist && npm publish`
