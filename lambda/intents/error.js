const Alexa = require('ask-sdk-core');

// Generic error handling to capture any syntax or routing errors
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~ Error handled: ${error.message}`);
    console.log(`~~ Error stack: ${error.stack}`);

    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = ErrorHandler;
