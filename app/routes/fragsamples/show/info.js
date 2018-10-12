import Route from '@ember/routing/route';

export default Route.extend({

  model() {
      return this.modelFor('fragsamples.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'info')
  },

});
