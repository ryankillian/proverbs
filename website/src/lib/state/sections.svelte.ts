// This is now just a plain object that holds our reactive state.
// It's exported so other parts of the app can import and use it.

const defaultState = {
	transcription: true,
	similar: true,
	analysis: true,
	scan: true
};

// We create the state object using $state.
// Anyone who imports this gets the same reactive object.
export const sectionsState = $state(defaultState);
