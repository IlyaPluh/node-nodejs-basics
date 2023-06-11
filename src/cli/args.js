const parseCommandLineArguments = (args) => {
    const parsedArguments = {};
  
    for (let i = 0; i < args.length; i += 2) {
      const propName = args[i].substring(2);
      const propValue = args[i + 1];
  
      parsedArguments[propName] = propValue;
    }
  
    return parsedArguments;
  };
  
  const printParsedArguments = (parsedArguments) => {
    for (const propName in parsedArguments) {
      const propValue = parsedArguments[propName];
      console.log(`${propName} is ${propValue}`);
    }
  };
  
  // Usage
  const commandLineArguments = process.argv.slice(2);
  const parsedArguments = parseCommandLineArguments(commandLineArguments);
  printParsedArguments(parsedArguments);
  