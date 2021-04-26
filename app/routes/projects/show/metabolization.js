import Route from '@ember/routing/route';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';

export default Route.extend(
  PaginatedRouteMixin, {

  model() {
    return this.modelFor('projects.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'metabolization')
    controller.set('spinnerStatus', 'waiting');
    controller.set('nodeData', null);
    let updatedItemIds = [...model.reaction_ids]
    controller.set('updatedItemIds', updatedItemIds)
    this.transitionTo('projects.show.metabolization', model);
  },

});
