import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
    model() {
        return this.get('store').createRecord('user', {});
    },

    setupController(controller, model) {
      this._super(...arguments);
      model.set('checkEmail', true );
      model.set('checkUsername', true );
      model.set('checkOrganization', true );
      model.set('checkPassword', true );
      model.set('checkConfirmPassword', true );
    },

});
