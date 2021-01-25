const Alexa = require('ask-sdk-core');

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 
      `This is Song Match. If you tell me your favorite music artist and answer some
      questions, I can tell you which song by that artist best matches your life. If
      you're taking a quiz and forgot the question, ask me to repeat it.`;
    const repromptOutput = 
      `Tell me your favorite music artist to start the Song Match quiz or ask me to
      repeat the question if you're in a quiz and forgot.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  }
};

module.exports = HelpIntentHandler;
