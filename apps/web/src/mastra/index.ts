import { createLogger } from "@mastra/core/logger";
import { Mastra } from "@mastra/core/mastra";

import { cycleTimeAgent } from "./agents";

export const mastra = new Mastra({
	agents: { cycleTimeAgent },
	logger: createLogger({
		name: "Mastra",
		level: "info",
	}),
});
