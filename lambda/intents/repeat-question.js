const Alexa = require('ask-sdk-core');
const RepeatIntentHandler = require('./repeat.js');
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

    // if not in a quiz, treat this as a normal request intent request
    if (!(gameStatus && gameStatus === 'STARTED')) {
      return RepeatIntentHandler.handle(handlerInput);
    }

    const { question } = Questions[artist][questionIndex - 1];
    return handlerInput.responseBuilder
      .speak(question)
      .reprompt(question)
      .getResponse();
  }
};

module.exports = RepeatQuestionIntentHandler;
