const parseEnvironmentVariables = () => {
    const envVariables = process.env;
    const parsedVariables = {};
  
    for (const key in envVariables) {
      if (key.startsWith('RSS_')) {
        const parsedKey = key.substring(4);
        const value = envVariables[key];
        parsedVariables[parsedKey] = value;
      }
    }
  
    return parsedVariables;
  };
  
  const printParsedVariables = (parsedVariables) => {
    let output = '';
  
    for (const key in parsedVariables) {
      const value = parsedVariables[key];
      output += `RSS_${key}=${value}; `;
    }
  
    if (output !== '') {
      // Remove the trailing semicolon and whitespace
      output = output.slice(0, -2);
      console.log(output);
    }
  };
  
  // Usage
  const parsedVariables = parseEnvironmentVariables();
  printParsedVariables(parsedVariables);
  