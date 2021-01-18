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

    const speakOutput = `Sorry, I can't help you with that. Try asking for help.`;
    const repromptOutput = `If you're not sure what to do, try asking for help.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  }
};

module.exports = FallbackHandler;
