const Songs = require('../constants/songs.js');
const yesNoEntities = require('../constants/yes-no.js');

// Compute song match from user's answers and ask user if they want to play again.
const getSongMatch = function(handlerInput) {
  const { attributesManager } = handlerInput;
  const sessionAttributes = attributesManager.getSessionAttributes();
  const { artist, artistName, userAnswers } = sessionAttributes;

  sessionAttributes.gameStatus = 'ENDED';
  attributesManager.setSessionAttributes(sessionAttributes);

  // update answer slot so user can indicate whether they want to continue
  const dynamicEntitiesDirective = {
    type: 'Dialog.UpdateDynamicEntities',
    updateBehavior: 'REPLACE',
    types: [
      {
        name: 'AnswerSlotType',
        values: yesNoEntities
      }
    ]
  };

  const songMatch = Songs[artist][userAnswers];
  const speakOutput = 
    `Based on your answers, your ${artistName} Song Match is “${songMatch}”.
    Would you like to get another Song Match with a different artist?`;
  return handlerInput.responseBuilder
    .addDirective(dynamicEntitiesDirective)
    .speak(speakOutput)
    .reprompt(speakOutput)
    .getResponse();
};

module.exports = getSongMatch;
