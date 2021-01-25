// Generates the directive to update a slot with the given dynamic entities
const updateDynamicEntities = function(slotType, entities) {
  return {
    type: 'Dialog.UpdateDynamicEntities',
    updateBehavior: 'REPLACE',
    types: [
      {
        name: slotType,
        values: entities
      }
    ]
  };
}

module.exports = updateDynamicEntities;
