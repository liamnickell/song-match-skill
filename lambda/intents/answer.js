const Alexa = require('ask-sdk-core');
const Questions = require('../constants/questions.js');

const AnswerIntentHandler = {
  canHandle(handlerInput) {
    // TODO: ensure game has started

    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
  },
  handle(handlerInput) {
    /* 
      TODO:
        - append answer index to sessionAttributes
        - use question index in sessionAttributes to determine next question
        - if no more questions left, determine song match
        - delegate to continue intent handler
    */
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    const questions = Questions[sessionAttributes.artist];
    const question = questions[sessionAttributes.questionIndex]['question'];

    const speakOutput = `In answer intent handler... question: ${question}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = AnswerIntentHandler;
