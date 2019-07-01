import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';

export default Route.extend(
    AuthenticatedRouteMixin,
    PaginatedRouteMixin,  {

    routeLabel: 'project',

    setupController(controller/*, model*/) {
        this._super(...arguments);
        controller.set('filter', 'private');
      },
});
