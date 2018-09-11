import Mixin from '@ember/object/mixin';
// import {cytoscape} from '@bower_components/cytoscape/dist';
import /*{ popper } from*/ 'cytoscape-popper';
import tippy from 'tippy.js';
import $ from 'jquery';

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
        danger: 'rgb(200,43,17)',
        info: 'rgb(83,139,214)',
      }
      let cose =  {
        name: 'cose',
        nodeRepulsion: 400000,
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
              'text-valign':  'center',
              'text-halign':  'center',
              'text-outline-color':  '#666',
              'text-outline-width':  '2px',
              'color': '#fff',
            })
          .selector('node[nodeType = "reaction"]')
            .css({
              'shape': 'roundrectangle',
              'width': '60px',
              'background-color': colors.primary,
              'text-outline-color':  colors.primary,
            })
          .selector('node[nodeType = "molecule"]')
            .css({
              'shape': 'ellipse',
            })
          .selector('node[nodeType = "molecule"][annotation = "init"]')
            .css({
              'background-color': colors.success,
              'text-outline-color':  colors.success,
            })
            .selector('node[nodeType = "molecule"][annotation = "proposal"]')
              .css({
                'background-color': colors.warning,
                'text-outline-color':  colors.warning,
              })
          .selector('.node-select')
            .css({
              'text-outline-color':  colors.info,
              'background-color': colors.info,
            })
          .selector('edge')
            .css({
              'curve-style': 'bezier',
              'width': 6,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'arrow-scale': 1.5,
            })
          .selector('.highlight')
            .css({
              'line-color':  colors.info,
              'background-color': colors.info,
              'target-arrow-color': colors.info,
              'text-outline-color':  colors.info,
            }),

        layout: cose,

        });

        cy.fit({padding: 20});

        this.set('cy',cy);

        var makeTippy = function(node) {
           return new Promise(function(resolve /*, reject */) {
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


            //let text = node.data('name');

            if (node.data('nodeType') === 'molecule') {
              var id = node.data('id');
              var smiles = node.data('smiles');
              // var molFile = node.data('molFile');
              let text =`
                <canvas                class="ChemDoodleWebComponent"
                  id="${id}" width="200" height="200"
                  alt="ChemDoodle Web Component"
                  style="width: 100px; height: 100px; background-color: rgb(255, 255, 255);">
                    This browser does not support HTML5/Canvas.
                </canvas>
                <p class='smiles-display'>
                  <button type="button" class="btn btn-light btn-sm label">Display smiles</button>
                  <span class='value m-1'>
                    ${smiles}
                  <span>
                </p>

              `;
              //                <p>${smiles}</p>
              let tippy = _makeTippy(text);
              node.hasTippy = true;
              resolve(tippy);

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
                      node.hasTippy = true;
                      resolve(tippy);
                  });
                }
              );
            }
          });
        };
        cy.nodes().on('taphold', function(evt) {
          cy.onHold = true;
          cy.nodes('.node-select').removeClass('node-select');
          let nodeTarget = evt.target;
          let nodeTargetPosBegin = nodeTarget.position();
          nodeTarget.addClass('node-select');
          if (nodeTarget.hasTippy) {
              nodeTarget.tippy.hide();
          }

          cy.elements('.shown-init').removeClass('shown-init');
          cy.elements(':visible').addClass('shown-init');

          cy.elements('.hidden-init').removeClass('hidden-init');
          cy.elements(':hidden').addClass('hidden-init');

          cy.elements().addClass('to-hide');
          cy.elements('.to-show').removeClass('to-show');
          nodeTarget.addClass('to-show');
          nodeTarget.predecessors().addClass('to-show');
          nodeTarget.successors().addClass('to-show');
          cy.elements('.to-show').removeClass('to-hide');

          var elementsToShow =  cy.elements('.to-show')

          var nodes = cy.nodes();
          // var nodesShownBegin = cy.nodes(':visible');
          var posBegin = {};
          var posEnd = {};
          var opacity = {};
          for( var i = 0; i < nodes.length; i++ ) {
            var n = nodes[i];
            var p = n.position();
            posBegin[ n.id() ] = { x: p.x, y: p.y };
          }

          var animateNode = function(positions) {

            cy.edges('.to-show').animate({
              style: {opacity: 1},
              duration: 1000,
            });

            var nodesToShow = cy.nodes('.to-show')
            for( var i = 0; i < nodesToShow.length; i++ ) {
              var n = nodesToShow[i];
              n.animate({
                style: {opacity: 1},
                position: positions[ n.id() ],
                duration: 1000,
              }).delay(1000, function(){
                cy.onHold = false;
              });
            }

          }
           cy.startBatch();

            cy.elements('.to-show').show();

            var l = elementsToShow.layout({
                    name: 'cose',
                    nodeRepulsion: 400000,
                    animate: true,
            })

            l.on('layoutstop', function() {
              for( var i = 0; i < nodes.length; i++ ){
                var n = nodes[i];
                var p = n.position();
                posEnd[ n.id() ] = { x: p.x, y: p.y };
                if (n.hasClass('to-show')) {
                  opacity[ n.id() ] = 1;
                } else {
                  opacity[ n.id() ] = 0;
                }
              }

              cy.animate({
                fit: {
                  eles: elementsToShow,
                  padding: 20
                }
                }, {
                duration: 1000,
              });

              nodes.positions( function (n/*, i*/) {
                return posBegin[ n.id() ];
              });

              cy.nodes('.hidden-init').positions( function() {
                return nodeTargetPosBegin;
              })

              cy.fit(cy.elements('.shown-init'),20)

              cy.elements('.to-hide').hide();

              animateNode( posEnd );
            })

            cy.elements('.hidden-init').style('opacity',0.001);
            cy.elements('.to-hide').style('opacity',0.001);

            l.run();


           cy.endBatch();

        });

        cy.nodes().on('mouseover', function(evt) {
          let nodeTarget = evt.target;
          nodeTarget.addClass('highlight');
          nodeTarget.predecessors().addClass('highlight');
          nodeTarget.successors().addClass('highlight');
        });

        cy.nodes().on('mouseout', function(evt) {
          let node = evt.target;
          if (node.hasTippy) {
              node.tippy.hide();
          }
          cy.elements().removeClass('highlight');
        });

        cy.nodes().on('tap', function(evt) {
            // } else {
          let node = evt.target;
          if (!cy.onHold) {
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
                  $('.tippy-content .smiles-display .label').click( function (event) {
                    $(event.target).parent().children().toggle();
                  })
                } else if (node.data('nodeType') === 'reaction') {
                  $('.tippy-content svg').attr('width',200).attr('height',100).attr('viewBox', '0 0 400 200');
                }
              });
            }
          }

            // }
        });
        // cy.onHold = false;
        // });

    },
  },

});
