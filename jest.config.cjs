module.exports = {
  testEnvironment: "jsdom",  // Necesario para testear React
  transform: {
    "^.+\\.jsx?$": "babel-jest"  // Usar Babel con Jest
  }
};

  