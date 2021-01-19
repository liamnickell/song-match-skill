const Alexa = require('ask-sdk-core');

const ArtistIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ArtistIntent';
  },
  handle(handlerInput) {
    /* 
      TODO:
        - parse for artist name, return asking them for a different artist if none satisfy
        - add artist name code to session attributes
        - set question index to 0
    */

    const artist = Alexa.getSlotValue(requestEnvelope, 'artist');
    const speakOutput = `Triggered artist intent with artist: ${artist}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse(); // return call to AnswerIntentHandler with handlerInput
  }
};

module.exports = ArtistIntentHandler;
