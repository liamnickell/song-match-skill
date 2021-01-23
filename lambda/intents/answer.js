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
    if (sessionAttributes.questionIndex == questions.length) {
      const speakOutput = `All questions asked! Computing song match...`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }

    const questionObject = questions[sessionAttributes.questionIndex]
    const question = questionObject['question'];
    sessionAttributes.questionIndex++;
    // TODO: explicitly set session attributes

    const dynamicEntitiesDirective = {
      type: 'Dialog.UpdateDynamicEntities',
      updateBehavior: 'REPLACE',
      types: [
        {
          name: 'Answer',
          values: questionObject['answers']
        }
      ]
    };

    const speakOutput = 
      `In answer intent handler... question ${sessionAttributes.questionIndex}: ${question}`;
    return handlerInput.responseBuilder
      .addDelegateDirective({
        name: 'AnswerIntent',
        confirmationStatus: 'NONE',
        slots: {}
      })
      .speak(speakOutput)
      .reprompt(speakOutput)
      .addDirective(dynamicEntitiesDirective)
      .getResponse();
  }
};

module.exports = AnswerIntentHandler;
