import Route from '@ember/routing/route';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';

export default Route.extend(
  FileDownloadMixin, {

  model() {
      return this.modelFor('fragsamples.show')
  },

  setupController(controller, model) {
    this._super(...arguments);
    model.set('activeNav', 'info')
  },

});
