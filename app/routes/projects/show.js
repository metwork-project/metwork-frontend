import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  AuthenticatedRouteMixin, {

    model(params) {
        return this.get('store').findRecord('project', params.project_id, { reload: true });
    },

    redirect(model, transition ) {
      if (transition.targetName === 'projects.show.index') {
        this.transitionTo('projects.show.info',model);
      }
    },

    actions: {
      saveProject(model) {
        model.save()
      },
    }
});
