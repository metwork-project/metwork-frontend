import Mixin from '@ember/object/mixin';
// import cytoscape from 'cytoscape';
import { popper } from 'cytoscape-popper';
import tippy from 'tippy.js';

export default Mixin.create({

	actions: {
		testAction() {
			let cy = this.get('cy')
			cy.animate({
				fit: {
					eles: cy.nodes(':visible'),
					padding: 20
				}
				}, {
				duration: 1000,
			});
		},

		startCytoscape(data) {
			let _this = this;
			let colors = {
				primary: '#073877',
				secondary: '#636a71',
				success: 'rgb(64,159,64)',
				warning: 'rgb(200,145,17)',
			}
			let cose =  {
				name: 'cose',
				// idealEdgeLength: 100,
				// nodeOverlap: 20,
				// refresh: 20,
				// fit: true,
				// padding: 30,
				// randomize: false,
				// componentSpacing: 100,
				nodeRepulsion: 400000,
				// edgeElasticity: 100,
				// nestingFactor: 5,
				// gravity: 80,
				// numIter: 1000,
				// initialTemp: 200,
				// coolingFactor: 0.95,
				// minTemp: 1.0,
				animate: true,
	    };

			this.set('layout', cose);

			// cytoscape.use( popper );

			var cy = cytoscape({
				container: $('#cy'),

				boxSelectionEnabled: false,
			  autounselectify: true,
				// maxZoom: 2,
			  // minZoom: 0.5,

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
							'width': 6,
							'line-color': '#ccc',
							'target-arrow-color': '#ccc',
							'target-arrow-shape': 'triangle',
							'arrow-scale': 1.5,
						}),

		    layout: cose,

				});

				cy.fit({padding: 20});

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
					if (node.hasTippy) {
							node.tippy.hide();
					}
					var nodes = cy.nodes();
					var nodesShownBegin = cy.nodes(':visible');
					var posBegin = {};
					var posEnd = {};
					for( var i = 0; i < nodes.length; i++ ) {
						var n = nodes[i];
						var p = n.position();

						posBegin[ n.id() ] = { x: p.x, y: p.y };
					}
					var animateNode = function(nodesTarget, positions, nodesHidden) {
						// console.log(nodesHidden);
						// nodesHidden.animate({
						// for( var i = 0; i < nodesHidden.length; i++ ) {
						// 	var n = nodesHidden[i]
						// 	n.animate({
						// 		style: {opacity:0.01},
						// 		position: positions[ n.position() ],
						// 		duration: 1000,
						// 	});
						// 	// n.hide();
						// }
						// nodesHiddenEnd.hide();
						for( var i = 0; i < nodesTarget.length; i++ ) {
							var n = nodesTarget[i];
							n.animate({
								style: {opacity: 1},
								position: positions[ n.id() ],
								duration: 1000,
							});
						}

					}
					 cy.startBatch();
					 	var nodeShownBegin = cy.elements(':visible');
					 	var nodesHiddenBegin = cy.elements(':hidden');
						cy.nodes().hide();
						node.show();
						node.predecessors().show();
						node.successors().show();
						var nodesShownEnd = cy.elements(':visible');
						var nodesHiddenEnd = cy.elements(':hidden');
						var l = nodesShownEnd.layout({
										name: 'cose',
										nodeRepulsion: 400000,
										animate: true,
						})
						nodeShownBegin.style('opacity', 1);
						nodesHiddenBegin.style('opacity', 0.01);
						l.on('layoutstop', function() {
							for( var i = 0; i < nodes.length; i++ ){
								var n = nodes[i];
								var p = n.position();
								posEnd[ n.id() ] = { x: p.x, y: p.y };
							}
							cy.animate({
								fit: {
									eles: nodesShownEnd,
									padding: 20
								}
								}, {
								duration: 1000,
							});
							nodes.positions( function (n, i) {
								return posBegin[ n.id() ];
							});
							cy.fit(nodeShownBegin,20)
							// nodeShownBegin.show();
							animateNode(nodesShownEnd, posEnd, nodesHiddenEnd);
						})
						l.run();


					 cy.endBatch();


					cy.onHold = true;

				});

				cy.nodes().on('mouseout', function(evt) {
					// if (!cy.onHold) {
						let node = evt.target;
						if (node.hasTippy) {
								node.tippy.hide();
						}
				});

				cy.nodes().on('mouseover', function(evt) {
						// } else {
					let node = evt.target;
					let nodeId = node.data('id')
					if (node.hasTippy) {
						node.tippy.show();
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
						// }
				});
				// cy.onHold = false;
				// });

		},
	},

});
