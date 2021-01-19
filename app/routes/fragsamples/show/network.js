import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.modelFor('fragsamples.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('spinnerStatus', 'waiting');
    controller.set('nodeData', null);
    model.set('activeNav', 'network')
  },

});
