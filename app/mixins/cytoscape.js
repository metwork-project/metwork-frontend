import Mixin from '@ember/object/mixin';

export default Mixin.create({

	actions: {
		startCytoscape(data) {
			let layout =  {
				name: 'cose',
				idealEdgeLength: 100,
				nodeOverlap: 20,
				refresh: 20,
				fit: true,
				padding: 30,
				randomize: false,
				componentSpacing: 100,
				nodeRepulsion: 400000,
				edgeElasticity: 100,
				nestingFactor: 5,
				gravity: 80,
				numIter: 1000,
				initialTemp: 200,
				coolingFactor: 0.95,
				minTemp: 1.0
	    };
			this.set('layout', layout);

			var cy = cytoscape({
				container: $('#cy'),

				elements: data,

  			style: cytoscape.stylesheet()
					.selector('node')
						.css({
							'shape': 'data(shape)',
							'background-color': '#666',
							'label': 'data(id)'
						})
					.selector('edge')
											.css({
							'width': 3,
							'line-color': '#ccc',
							'target-arrow-color': '#ccc',
							'target-arrow-shape': 'triangle'
						}),

		    layout: layout,

				});
				this.set('cy',cy);
		},
	},

});
