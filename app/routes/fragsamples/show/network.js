import Route from '@ember/routing/route';

export default Route.extend({

  model() {
      return this.modelFor('fragsamples.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('spinnerStatus', 'waiting');
    model.set('activeNav', 'network')
  },

});
