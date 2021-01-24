const Alexa = require('ask-sdk-core');

// Handles the fallback amazon built-in intent -- triggered by unrecognized input
const FallbackHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { gameStatus } = sessionAttributes;

    let speakOutput = `Sorry, I can't help you with that. Try asking for help.`;
    let repromptOutput = `If you're not sure what to do, try asking for help.`;
    if (gameStatus) {
      if (gameStatus === 'LAUNCHED') {
        speakOutput = 
          `Sorry, I don't support song matching for that artist. The artists 
          I do support are Run the Jewels, Kendrick Lamar, Tame Impala, and 
          Daft Punk. Try saying one of those artists.`;
        repromptOutput = 
          `Try saying an artist name to start a Song Match quiz. You can also 
          ask for help if you're stuck.`;
      } else if (gameStatus === 'STARTED') {
        speakOutput = 
          `Sorry, I didn't understand your answer. Try saying it more clearly 
          or ask me to repeat the question if you forgot.`;
        repromptOutput = 
          `Ask me to repeat the question if you forgot, or ask for help if 
          you're stuck.`;
      } else if (gameStatus === 'ENDED') {
        speakOutput = 
          `Sorry, I can't help you with that. Do you want to get another 
          Song Match with a different artist?`;
        repromptOutput = 
          `Do you want to get another Song Match with a different artist?
          You can ask for help if you're stuck.`;
      }
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  }
};

module.exports = FallbackHandler;
