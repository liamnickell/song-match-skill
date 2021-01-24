const Alexa = require('ask-sdk-core');

// Retrieves the id of the user's answer from the request json
const getAnswerID = function(requestEnvelope) {
  const answerSlot = Alexa.getSlot(requestEnvelope, 'answer');
  const resolutions = answerSlot.resolutions.resolutionsPerAuthority;
  for (const res of resolutions) {
    if (res.status.code === 'ER_SUCCESS_MATCH') {
      return res.values[0].value.id;
    }
  }
  return null;
};

module.exports = getAnswerID;
