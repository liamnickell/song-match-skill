/*
  Dynamic entities for asking user if they want to play again. We can't use
  YesIntent / NoIntent since Yes/No questions are asked in some quizzes,
  which would cause an utterance conflict. Elliciting the slot would fix that
  problem of context, but at the moment Alexa doesn't allow responses to have
  both EllicitSlot and UpdateDynamicEntities directives in the same response.
*/
const yesNoEntities = [
  {
    'id': 'YES',
    'name': {
      'value': 'yes',
      'synonyms': [
        'yeah',
        'definitely',
        'of course',
        'for sure',
        'yep',
        'hell yeah',
        'hell yes'
      ]
    }
  },
  {
    'id': 'NO',
    'name': {
      'value': 'no',
      'synonyms': [
        'no way',
        'definitely not',
        'no thank you',
        'hell no'
      ]
    }
  }
];

module.exports = yesNoEntities;
