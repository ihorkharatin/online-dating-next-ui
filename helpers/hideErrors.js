const originalConsoleError = console.error;

console.error = (...args) => {
    const error1 = args[0].includes("React does not recognize");
    const error2 = args[0].includes("Using UNSAFE_componentWillMount");
    const error3 = args[0].includes("Received `true` for a non-boolean");

  if (error1 || error2 || error3) {
    return; 
  }

  originalConsoleError(...args);
};