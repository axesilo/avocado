import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    "header-max-length": [RuleConfigSeverity.Error, "always", 100],
  },
  helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};

export default Configuration;
