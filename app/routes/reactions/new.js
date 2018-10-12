import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  AuthenticatedRouteMixin, {

    model() {
        return this.get('store').createRecord('reaction');
    },

  actions: {
    createReaction(model) {
      let this_=this;
      model.set('chemdoodle_json', {})
      model.save().then(function() {
        this_.transitionTo('reactions.show', model);
      }, function() {
      });
    },
  },

});
