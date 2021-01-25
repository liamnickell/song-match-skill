const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = require('./intents/launch.js');
const NewSessionHandler = require('./intents/new-session.js');
const SessionEndedRequestHandler = require('./intents/session-ended.js');
const ExitIntentHandler = require('./intents/exit.js');
const HelpIntentHandler = require('./intents/help.js');
const RepeatIntentHandler = require('./intents/repeat.js');
const ArtistIntentHandler = require('./intents/artist.js');
const AnswerIntentHandler = require('./intents/answer.js');
const RepeatQuestionIntentHandler = require('./intents/repeat-question.js');
const FallbackHandler = require('./intents/fallback.js');
const SaveResponseInterceptor = require('./interceptors/save-response.js');
const ErrorHandler = require('./intents/error.js');


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    NewSessionHandler,
    SessionEndedRequestHandler,
    ExitIntentHandler,
    HelpIntentHandler,
    RepeatIntentHandler,
    ArtistIntentHandler,
    AnswerIntentHandler,
    RepeatQuestionIntentHandler,
    FallbackHandler,
  )
  .addResponseInterceptors(
    SaveResponseInterceptor,
  )
  .addErrorHandlers(
    ErrorHandler,
  )
  .lambda();
