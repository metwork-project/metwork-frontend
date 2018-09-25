import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import ENV from '../config/environment'

export default Controller.extend( FileDownloadMixin, CytoscapeMixin, {
  session: service('session'),
  apiStatus: service('api-status'),
  version: ENV.version,

	actions: {
    getFile(request, fileName) {
       this.send('downloadFile', request, "text/plain;charset=utf-8", fileName);
    },
  },

});
