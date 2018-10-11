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
    this.transitionTo('projects.show.metabolization',model);
  },

});
