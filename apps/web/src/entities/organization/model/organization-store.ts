import { create } from "zustand";
import type { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Organization } from "@/shared/schema";

type RFState = {
	currentOrganization: Organization | null;
	setCurrentOrganization: (organization: Organization | null) => void;
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
