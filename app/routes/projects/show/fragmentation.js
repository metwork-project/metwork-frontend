import Route from '@ember/routing/route';
import FileUploadRouteMixin from 'metwork-frontend/mixins/file-upload-route';

export default Route.extend(
  FileUploadRouteMixin,
  {

    model() {
      return this.modelFor('projects.show')
    },

    setupController(controller, model) {
      this._super(...arguments);
      controller.set('uploadCustomFragFile', 'projects/' + model.id + '/load_custom_frag_file');
      model.set('activeNav', 'fragmentation')
      controller.getFragCompareConf();
    },

  });
