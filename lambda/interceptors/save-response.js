// Save last response for repeat intent handler
const SaveResponseInterceptor = {
  process(handlerInput) {
    const { responseBuilder, attributesManager } = handlerInput;
    const response = responseBuilder.getResponse();
    const sessionAttributes = attributesManager.getSessionAttributes();

    sessionAttributes.lastResponse = response;
  }
};

module.exports = SaveResponseInterceptor;
