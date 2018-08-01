import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';
import { computed } from '@ember/object';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';

export default Controller.extend( FileDownloadMixin, CytoscapeMixin, {
  session: service('session'),

	data: function() {

		return [ // list of graph elements to start with
					{ // node a
						data: { id: 'a' , shape: 'roundrectangle'}
					},
					{ // node b
						data: { id: 'b' , shape: 'triangle',}
					},
					{ // edge ab
						data: { id: 'ab', source: 'a', target: 'b' }
					}
				]

	},

	actions: {
    getFile(request, fileName) {
       this.send('downloadFile', request, "text/plain;charset=utf-8", fileName);
    },
		changeData() {
			let data = [ // list of graph elements to start with
						{ // node c
							data: { id: 'c' , shape: 'ellipse', }
						},
						{ // edge bc
							data: { id: 'bc', source: 'b', target: 'c' }
						},
					];
			let cy = this.get('cy');
			cy.add(data);

			let  layout = cy.layout( this.get('layout') )
			layout.run();
			cy.fit();
		},
		testCytoscape() {
			this.send('startCytoscape', this.get('data')());
		},
	},

});
