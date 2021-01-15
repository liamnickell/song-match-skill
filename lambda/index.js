const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = require('./intents/launch.js');
const HelpIntentHandler = require('./intents/help.js');
const ExitIntentHandler = require('./intents/exit.js');
const SessionEndedRequestHandler = require('./intents/session-ended.js');
const IntentReflectorHandler = require('./intents/reflector.js');
const ErrorHandler = require('./intents/error.js');


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
  )
  .addErrorHandlers(
    ErrorHandler,
  )
  .lambda();
