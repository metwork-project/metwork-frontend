import Route from '@ember/routing/route';

export default Route.extend({

  model() {
      return this.modelFor('projects.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'fragmentation')
    controller.getFragCompareConf();
  },

});
