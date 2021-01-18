const Alexa = require('ask-sdk-core');

/* 
  Repeats the previous response by returning the response object stored in the
  lastResponse session attribute.
*/
const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const sessionArributes = attributesManager.getSessionAttributes();
    const { lastResponse } = sessionArributes;

    // this lets the save response interceptor get the repeated response
    handlerInput.responseBuilder.getResponse = () => lastResponse;

    // lastResponse is already formatted, so no need for responseBuilder
    return lastResponse;
  }
}

module.exports = RepeatIntentHandler;
