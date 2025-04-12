export const paths = {
	home: {
		getHref: () => "/",
	},
	auth: {
		signUp: {
			getHref: () => "/signup",
		},
		logIn: {
			getHref: () => "/login",
		},
	},
	app: {
		root: {
			getHref: () => "/dashboard",
		},
		dashboard: {
			getHref: () => "/dashboard",
		},
		account: {
			getHref: () => "/dashboard/account/me",
		},
	},
} as const;
