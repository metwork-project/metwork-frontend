import DS from 'ember-data';

export default DS.Model.extend({

  available: DS.attr('boolean'),
  molecules_count: DS.attr('number'),
  achieved_projects_count: DS.attr('number'),
  running_projects_count: DS.attr('number'),
});
