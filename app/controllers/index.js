import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import ENV from '../config/environment'

export default Controller.extend( CytoscapeMixin, {
  session: service('session'),
  apiStatus: service('api-status'),
  version: ENV.version,

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

});
