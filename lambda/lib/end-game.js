/* 
  Determines if the user wants to play again and starts a new game if so,
  otherwise the skill session ends.
*/
const handleEndGame = function(handlerInput, answerID) {
  const { attributesManager } = handlerInput;
  const sessionAttributes = attributesManager.getSessionAttributes();

  if (answerID === 'YES') {
    sessionAttributes.gameStatus = 'LAUNCHED';
    attributesManager.setSessionAttributes(sessionAttributes);

    const speakOutput = 
      `Ok, great! Which artist would you like to get a Song Match with?`;
    const repromptOutput = 
      `Which artist would you like to get a Song Match with?`;
    return handlerInput.responseBuilder
      .addElicitSlotDirective('artist', {
        name: 'ArtistIntent',
        confirmationStatus: 'NONE',
        slots: {}
      })
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  }
  
  const speakOutput = 
    `Ok, thank you for using Song Match. For another great skill, check 
    out Song Quiz!`;
  return handlerInput.responseBuilder
    .speak(speakOutput)
    .withShouldEndSession(true)
    .getResponse();
};

module.exports = handleEndGame;
