import { create } from "zustand";
import type { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Project } from "@/shared/schema";

type RFState = {
	currentProject: Project | null;
	setCurrentProject: (project: Project | null) => void;
};

const rfState: StateCreator<RFState> = (set) => ({
	currentProject: null,
	setCurrentProject: (project) => set({ currentProject: project }),
});

const persistOptions = {
	name: "project",
};

/**
 * Zustand store for managing project state
 *
 * This store persists the current project in localStorage
 * In development mode, it includes Redux DevTools support
 */
export const useProjectStore =
	process.env.NODE_ENV === "production"
		? create<RFState>()(persist(rfState, persistOptions))
		: create<RFState>()(persist(devtools(rfState), persistOptions));
