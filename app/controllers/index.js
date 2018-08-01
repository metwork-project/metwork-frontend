import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';

export default Controller.extend( FileDownloadMixin, {
  session: service('session'),

	actions: {
    getFile(request, fileName) {
       this.send('downloadFile', request, "text/plain;charset=utf-8", fileName);
    },
	},

});
