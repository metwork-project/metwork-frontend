import Mixin from '@ember/object/mixin';
import ENV from 'metwork-frontend/config/environment';
import FileSaver from 'file-saver';
import $ from 'jquery';

export default Mixin.create({

	actions: {
		downloadFile( model, route, request, fileType, fileName) {
			let url = ENV.host;
			if (ENV.APInameSpace != '') {
					url += '/' + ENV.APInameSpace;
			}
			url += this.router.generate(route, model)

			url += '/' + request;
			let access_token = this.get('session.data.authenticated.token');
			$.ajax({
				beforeSend: function(xhr){
						xhr.setRequestHeader('Authorization', `Token ${access_token}`);
				},
				url: url,
				type: 'GET',
				}).then(function(response) {
						let blob = new Blob([response], {type: fileType});
						FileSaver.saveAs(blob, fileName);
				});
		},
	},

});
