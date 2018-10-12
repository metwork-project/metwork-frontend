import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  AuthenticatedRouteMixin,
  {

  model(params) {
      return this.get('store').findRecord('fragsample', params.fragsample_id, { reload: true });
  },

  redirect(model, transition ) {
    if (transition.targetName === 'fragsamples.show.index') {
      this.transitionTo('fragsamples.show.info',model);
    }
  },

});
