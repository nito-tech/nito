import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		/**
		 * Subject-case rule enforces the case of the subject in commit messages.
		 *
		 * @example
		 * OK
		 * feat: Add new feature
		 * fix: Resolve issue with API
		 *
		 * NG
		 * feat: add new feature
		 * fix: resolve issue with API
		 */
		"subject-case": [2, "always", ["pascal-case", "sentence-case"]],
	},
};

export default config;
