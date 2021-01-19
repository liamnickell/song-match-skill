const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 
      `Welcome to Song Match. I can help you understand which song by your favorite 
      artist best matches your life. Who's your favorite artist?`;
    return handlerInput.responseBuilder
      .addElicitSlotDirective('artist', {
          name: 'ArtistIntent',
          confirmationStatus: 'NONE',
          slots: {}
      })
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = LaunchRequestHandler;
