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
      sessionAttributes.artistName = 'Run the Jewels';
    } else if (artist === 'kendrick lamar') {
      sessionAttributes.artist = 'kendrickLamar';
      sessionAttributes.artistName = 'Kendrick Lamar';
    } else if (artist === 'tame impala') {
      sessionAttributes.artist = 'tameImpala';
      sessionAttributes.artistName = 'Tame Impala';
    } else {
      sessionAttributes.artist = 'daftPunk';
      sessionAttributes.artistName = 'Daft Punk';
    }

    sessionAttributes.questionIndex = 0;
    sessionAttributes.userAnswers = '';
    sessionAttributes.gameStatus = 'STARTED';
    attributesManager.setSessionAttributes(sessionAttributes);

    // call answer intent handler to immediately ask user the first question
    return AnswerIntentHandler.handle(handlerInput);
  }
};

module.exports = ArtistIntentHandler;
