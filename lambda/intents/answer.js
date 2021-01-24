const Alexa = require('ask-sdk-core');
const Questions = require('../constants/questions.js');
const Songs = require('../constants/songs.js');
const getAnswerID = require('../lib/get-answer.js');

const AnswerIntentHandler = {
  canHandle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { gameStatus } = sessionAttributes;

    return Alexa.getRequestType(requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(requestEnvelope) === 'AnswerIntent'
      && gameStatus === 'STARTED';
  },
  handle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { artist, questionIndex } = sessionAttributes;

    // confirm user answer is valid and add it to their current answers string
    if (questionIndex !== 0) {
      const answerID = getAnswerID(requestEnvelope);
      if (answerID) {
        sessionAttributes.userAnswers += answerID;
      } else {
        const speakOutput = 
          `Sorry, I didn't understand your answer. Try saying it more clearly 
          or ask me to repeat the question if you forgot.`;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
      }
    }

    // compute song match from previous answers
    const questions = Questions[artist];
    if (questionIndex === questions.length) {
      sessionAttributes.gameStatus = 'ENDED';
      attributesManager.setSessionAttributes(sessionAttributes);
      
      const songMatch = Songs[artist][sessionAttributes.userAnswers];
      const speakOutput = 
        `Based on your answers, your Song Match is “${songMatch}”. Would you 
        like to get another Song Match with a different artist?`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }

    const questionObject = questions[questionIndex];
    const question = questionObject.question;
    sessionAttributes.questionIndex++;
    attributesManager.setSessionAttributes(sessionAttributes);

    // update answer slot with possible answers for current question
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
    if (questionIndex === 0) {
      affirmation = 'Great';
    } else if (questionIndex === questions.length - 1) {
      affirmation = 'Lastly';
    }

    const speakOutput = 
      `${affirmation}. Question ${questionIndex + 1}: ${question}`;
    return handlerInput.responseBuilder
      .addDirective(dynamicEntitiesDirective)
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = AnswerIntentHandler;
