import Mixin from '@ember/object/mixin';
import ENV from 'metwork-frontend/config/environment';
import FileSaver from 'file-saver';
import $ from 'jquery';

export default Mixin.create({

	actions: {
		downloadFile( model, file, fileType, fileName) {
			model.downloadFile({
				file: file,
				file_name: fileName
			}).then( function(response) {
				let blob = new Blob([JSON.parse(response).data], {type: fileType});
				FileSaver.saveAs(blob, fileName);
			})
		},
	},

});
