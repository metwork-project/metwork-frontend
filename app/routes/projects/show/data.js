import Route from '@ember/routing/route';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  PaginatedRouteMixin,
  AuthenticatedRouteMixin, {

  model() {
    return this.modelFor('projects.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'data')
    let updatedItemIds = [...model.annotation_init_ids]
    controller.set('updatedItemIds', updatedItemIds)
    let selected = "selected"
    if (model.editable) { selected = "all" }
    controller.set("selected", selected)
  },

});
