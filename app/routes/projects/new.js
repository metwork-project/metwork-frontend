import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  AuthenticatedRouteMixin, {

    model() {
        return this.get('store').createRecord('project');
    },

  actions: {
    createProject(model) {
      let this_=this;
      model.save().then(function() {
        // self.controller.genDataComponents();
        // self.controller.getFragCompareConf();
        this_.transitionTo('projects.show.info', model);
      }, function() {
      });
    },
  },

});
