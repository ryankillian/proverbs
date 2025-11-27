declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageData {
			wide?: boolean; // This is the crucial line
		}
		// interface Platform {}
	}
}

export {};
