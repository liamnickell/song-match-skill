const Alexa = require('ask-sdk-core');
const Questions = require('../constants/questions.js');
const getAnswerID = require('../lib/get-answer.js');
const getSongMatch = require('../lib/get-match.js');
const handleEndGame = require('../lib/end-game.js');

const AnswerIntentHandler = {
  canHandle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { gameStatus } = sessionAttributes;

    return Alexa.getRequestType(requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(requestEnvelope) === 'AnswerIntent'
      && (gameStatus === 'STARTED' || gameStatus === 'ENDED');
  },
  handle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { artist, questionIndex, artistName } = sessionAttributes;

    // confirm user answer is valid and add it to their current answers string
    if (questionIndex !== 0) {
      const answerID = getAnswerID(requestEnvelope);
      if (!answerID) {
        const speakOutput = 
          `Sorry, I didn't understand your answer. Try saying it more clearly 
          or ask me to repeat the question if you forgot.`;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
      } else if (gameStatus === 'ENDED') {
        // start new game if user responded 'yes' when asked to play again
        return handleEndGame(handlerInput, answerID);
      } else {
        sessionAttributes.userAnswers += answerID;
        attributesManager.setSessionAttributes(sessionAttributes);
      }
    }

    const questions = Questions[artist];
    if (questionIndex === questions.length) {
      return getSongMatch(handlerInput);
    }
    sessionAttributes.questionIndex++;
    attributesManager.setSessionAttributes(sessionAttributes);

    // update answer slot with possible answers for current question
    const questionObject = questions[questionIndex];
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
      affirmation = `Great, ${artistName}`;
    } else if (questionIndex === questions.length - 1) {
      affirmation = 'Lastly';
    }

    const question = questionObject.question;
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
