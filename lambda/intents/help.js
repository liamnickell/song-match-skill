const Alexa = require('ask-sdk-core');

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 
      `This is Song Match. If you tell me your favorite music artist and answer some
      questions, I can tell you which song by that artist best matches your life.`;
    const repromptOutput = 
      `Tell me your favorite music artist to start the Song Match quiz.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  }
};

module.exports = HelpIntentHandler;
