import { addons } from "@storybook/manager-api";
import {
	type TagBadgeParameters,
	defaultConfig,
} from "storybook-addon-tag-badges";

addons.setConfig({
	tagBadges: [
		{
			tags: "validation",
			badge: {
				text: "Validation",
				bgColor: "#7dd3fc",
				fgColor: "#020617",
				borderColor: "#38bdf8",
				tooltip: "Zod validation test",
			},
		},
		...defaultConfig,
	] satisfies TagBadgeParameters,
});
