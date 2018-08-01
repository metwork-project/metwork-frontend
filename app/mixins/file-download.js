import Mixin from '@ember/object/mixin';
import ENV from 'metwork-frontend/config/environment';
import FileSaver from 'file-saver';
import $ from 'jquery';

export default Mixin.create({

	actions: {
		downloadFile( request, fileType, fileName) {	
			let url = ENV.host;
			if (ENV.APInameSpace != '') {
					url += '/' + ENV.APInameSpace;
			}
			if (this.get('router.url')) {
				url += this.get('router.url')
			}
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
