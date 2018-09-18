import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import FileUploadRouteMixin from 'metwork-frontend/mixins/file-upload-route';

export default Route.extend(
    AuthenticatedRouteMixin,
    PaginatedRouteMixin,
    FileUploadRouteMixin, {

    routeLabel: 'reaction',

    setupController(controller, model) {
      this._super(...arguments);
      controller.set('filter', 'is_active');
    },

});
