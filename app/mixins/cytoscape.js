import Mixin from '@ember/object/mixin';
// import cytoscape from 'cytoscape';
import { popper } from 'cytoscape-popper';
import tippy from 'tippy.js';

export default Mixin.create({

	actions: {
		startCytoscape(data) {
			let _this = this;
			let colors = {
				primary: '#073877',
				secondary: '#636a71',
				success: 'rgb(64,159,64)',
				warning: 'rgb(200,145,17)',
			}
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

			// cytoscape.use( popper );

			var cy = cytoscape({
				container: $('#cy'),

				boxSelectionEnabled: false,
			  autounselectify: true,
				maxZoom: 2,
			  minZoom: 0.5,

				elements: data,

  			style: cytoscape.stylesheet()
					.selector('node')
						.css({
							'background-color': '#666',
							'label': 'data(name)',
							'text-valign':	'center',
							'text-halign':	'center',
							'text-outline-color':	'#666',
							'text-outline-width':	'2px',
							'color': '#fff',
						})
					.selector('node[nodeType = "reaction"]')
						.css({
							'shape': 'roundrectangle',
							'background-color': colors.primary,
							'text-outline-color':	colors.primary,
						})
					.selector('node[nodeType = "molecule"]')
						.css({
							'shape': 'ellipse',
						})
					.selector('node[nodeType = "molecule"][annotation = "init"]')
						.css({
							'background-color': colors.success,
							'text-outline-color':	colors.success,
						})
						.selector('node[nodeType = "molecule"][annotation = "proposal"]')
							.css({
								'background-color': colors.warning,
								'text-outline-color':	colors.warning,
							})
					.selector('edge')
						.css({
			        'curve-style': 'bezier',
							'width': 4,
							'line-color': '#ccc',
							'target-arrow-color': '#ccc',
							'target-arrow-shape': 'triangle',
						}),

		    layout: layout,

				});

				this.set('cy',cy);

				var makeTippy = function(node) {
				 	return new Promise(function(resolve, reject) {
						var _makeTippy = function(text) {
							let t = tippy( node.popperRef(), {
							html: (function(){
								var div = document.createElement('div');
								div.innerHTML = text;
								return div;
							})(),
							trigger: 'manual',
							arrow: true,
							// placement: 'bottom',
							theme: 'light',
							hideOnClick: false,
							multiple: false,
							sticky: true,
							stickyDuration: 0,
							} ).tooltips[0];
							node.tippy = t;
							return t;
						};

						node.hasTippy = true;
						let text = node.data('name');

						if (node.data('nodeType') === 'molecule') {
							var id = node.data('id');
							var smiles = node.data('smiles');
							var molFile = node.data('molFile');
							let text =`
								<canvas						    class="ChemDoodleWebComponent"
							    id="${id}" width="200" height="200"
							    alt="ChemDoodle Web Component"
							    style="width: 100px; height: 100px; background-color: rgb(255, 255, 255);">
							      This browser does not support HTML5/Canvas.
							  </canvas>

							`;
							//								<p>${smiles}</p>
							let tippy = _makeTippy(text);
							resolve(tippy);;

						} else if (node.data('nodeType') === 'reaction') {
							_this.get('store').findRecord(
								'reaction', node.data('reactionId'), { reload: true }).then( function (response) {
									response.getImage().then(function(response) {
										 let text =`
											 <div>
												 ${response.data.image}
											 </div>
											 <p>${ node.data('name')}</p>
										 `;
										 let tippy = _makeTippy(text);
										 resolve(tippy);
									});
								}
							);
						}
					});
				};

				cy.nodes().on('tap', function(evt) {
					let node = evt.target;
					let nodeId = node.data('id')
					if (node.hasTippy) {
						let tippy = node.tippy
						if(tippy.state.visible) {
							tippy.hide();
						} else {
							tippy.show();
						}
					} else {
						makeTippy(node).then( function (tippy) {
							tippy.show();
							// node.tippy.show();
							if (node.data('nodeType') === 'molecule') {
								var viewACS = new ChemDoodle.ViewerCanvas(nodeId, 200, 200);
								viewACS.specs.bonds_width_2D = .6;
								viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
								viewACS.specs.bonds_hashSpacing_2D = 2.5;
								viewACS.specs.atoms_font_size_2D = 10;
								viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
								viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
								// var molfile =
								var moltarget = ChemDoodle.readMOL(node.data('molFile'));
								moltarget.scaleToAverageBondLength(14.4);
								viewACS.loadMolecule(moltarget);
							}
						});

					}
				});

		},
	},

});
