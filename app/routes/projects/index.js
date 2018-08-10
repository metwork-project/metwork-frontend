import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';

export default Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin,  {

    routeLabel: 'project',

    actions: {
        showProject(model) {
            this.transitionTo('projects.show', model);
        },
        newProject(model) {
            let mr = model.store.createRecord('project', {
                });
            this.transitionTo('projects.show', mr);
        },
    },
});
