const Alexa = require('ask-sdk-core');
const Questions = require('../constants/questions.js');

const RepeatQuestionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatQuestionIntent';
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { gameStatus, artist, questionIndex } = sessionAttributes;

    if (!(gameStatus || gameStatus === 'STARTED')) {
      const speakOutput = 
        `No quiz questions have been asked yet! Try asking for help.`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }

    const { question } = Questions[artist][questionIndex];
    return handlerInput.responseBuilder
      .speak(question)
      .reprompt(question)
      .getResponse();
  }
};

module.exports = RepeatQuestionIntentHandler;
