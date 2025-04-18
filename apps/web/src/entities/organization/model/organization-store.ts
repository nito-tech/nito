import { create } from "zustand";
import type { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { SelectOrganization } from "@nito/db";

type RFState = {
	currentOrganization: SelectOrganization | null;
	setCurrentOrganization: (organization: SelectOrganization | null) => void;
};

const rfState: StateCreator<RFState> = (set) => ({
	currentOrganization: null,
	setCurrentOrganization: (organization) =>
		set({ currentOrganization: organization }),
});

const persistOptions = {
	name: "organization",
};

/**
 * Zustand store for managing organization state
 *
 * This store persists the current organization in localStorage
 * In development mode, it includes Redux DevTools support
 */
export const useOrganizationStore =
	process.env.NODE_ENV === "production"
		? create<RFState>()(persist(rfState, persistOptions))
		: create<RFState>()(persist(devtools(rfState), persistOptions));
