const Alexa = require('ask-sdk-core');
const Questions = require('../constants/questions.js');

const AnswerIntentHandler = {
  canHandle(handlerInput) {
    // TODO: ensure game has started

    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
  },
  handle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { artist, questionIndex } = sessionAttributes;

    // compute song match from previous answers
    const questions = Questions[artist];
    if (questionIndex == questions.length) {
      const speakOutput = `All questions asked! Computing song match...`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }

    const questionObject = questions[questionIndex];
    const question = questionObject.question;
    sessionAttributes.questionIndex++;
    // TODO: explicitly set session attributes

    const dynamicEntitiesDirective = {
      type: 'Dialog.UpdateDynamicEntities',
      updateBehavior: 'REPLACE',
      types: [
        {
          name: 'AnswerSlotType',
          values: questionObject.answers
        }
      ]
    };

    let affirmation = 'Ok';
    if (questionIndex == 1) {
      affirmation = 'Great';
    } else if (questionIndex == questions.length) {
      affirmation = 'Lastly';
    }

    const speakOutput = `${affirmation}, question ${questionIndex}: ${question}`;
    return handlerInput.responseBuilder
      .addDirective(dynamicEntitiesDirective)
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = AnswerIntentHandler;
