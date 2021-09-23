import React, { useState , createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({children}) => {
	const [state, setState] = useState(undefined);

	// Provide a user to our application from the context created above
	return (
		<Context.Provider value={[state, setState]}>{children}</Context.Provider>
	);
};

export default ContextProvider;
