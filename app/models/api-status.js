import DS from 'ember-data';

export default DS.Model.extend({

  available: DS.attr('boolean'),
  molecules_count: DS.attr('number'),

});
