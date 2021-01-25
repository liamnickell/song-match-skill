const Alexa = require('ask-sdk-core');

// Handles new sessions that aren't launch requests by telling user to open skill
const NewSessionHandler = {
  canHandle(handlerInput) {
    return Alexa.isNewSession(handlerInput.requestEnvelope);
  },
  handle(handlerInput) {
    const speakOutput = 
      `Sorry, I can't help with that. Say "open Song Match" if you want to play.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .getResponse();
  }
};

module.exports = NewSessionHandler;
