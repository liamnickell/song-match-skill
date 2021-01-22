const Alexa = require('ask-sdk-core');
const AnswerIntentHandler = require('./answer.js');

const ArtistIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ArtistIntent';
  },
  handle(handlerInput) {
    const { requestEnvelope, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    // set session attribute for chosen artist
    const artist = Alexa.getSlotValue(requestEnvelope, 'artist').toLowerCase();
    if (artist === 'run the jewels') {
      sessionAttributes.artist = 'runTheJewels';
    } else if (artist === 'kendrick lamar') {
      sessionAttributes.artist = 'kendrickLamar';
    } else if (artist === 'tame impala') {
      sessionAttributes.artist = 'tameImpala';
    } else {
      sessionAttributes.artist = 'daftPunk';
    }

    sessionAttributes.questionIndex = 0;
    sessionAttributes.currentAnswers = '';
    sessionAttributes.gameStatus = 'STARTED';
    attributesManager.setSessionAttributes(sessionAttributes);

    // call answer intent handler to immediately ask user the first question
    return AnswerIntentHandler.handle(handlerInput);
  }
};

module.exports = ArtistIntentHandler;
