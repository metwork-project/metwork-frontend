import Route from '@ember/routing/route';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(
  AuthenticatedRouteMixin,
  FileDownloadMixin, {

  model() {
      return this.modelFor('projects.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'info')
  },

  actions: {
      cancel_create(model) {
          if(!model.get('id')){
              model.deleteRecord();
              this.transitionTo('projects');
          }
      },
      redirectToProject(clone_id) {
        this.transitionTo('/projects/' + clone_id);
      },
      delete_p(model) {
          let self=this;
          model.destroyRecord().then(function() {
              self.transitionTo('projects');
          }, function() {
            alert('error')
          });
      },
  },

});
