export default (debug, componentName) => {
	return debug
		? (...args) =>
				console.log(...[`<${componentName}/> Debug Log: `, ...args])
		: () => {};
};
