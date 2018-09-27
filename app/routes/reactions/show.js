import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

    model(params) {
        return this.get('store').findRecord('reaction', params.reaction_id, { reload: true });
    },

    setupController(controller, model) {
        this._super(...arguments);
        controller.getImage();
        model.getJSON();
    },

});
