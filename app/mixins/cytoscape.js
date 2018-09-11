import Mixin from '@ember/object/mixin';
// import {cytoscape} from '@bower_components/cytoscape/dist';
import /*{ popper } from*/ 'cytoscape-popper';
import tippy from 'tippy.js';
import $ from 'jquery';
import CytoscapeStyleMixin from 'metwork-frontend/mixins/cytoscape-style';

export default Mixin.create(CytoscapeStyleMixin, {

  activateTippy: function(cy) {
    cy.tippyActivated = true
  },

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

    startCytoscape(data, activateOptions) {
      let _this = this;
      let cose =  {
        name: 'cose',
        nodeRepulsion: 40000,
        nodeOverlap: 20,
        gravity: 1,
        animate: true,
        componentSpacing: 100,
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
        style: this.cyStyle(),
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
            var cosine = node.data('cosine');
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
              <p class='cosine-display'>
                cosine : ${cosine}
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

      cy.nodes().on('mouseout', function(evt) {
        let nodeTarget = evt.target;
        if (nodeTarget.hasTippy) {
            nodeTarget.tippy.hide();
        }
      });

      cy.nodes().on('tap', function(evt) {
          // } else {
        let node = evt.target;
        if (cy.tippyActivated && !cy.onHold) {
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
      });

      activateOptions.map( function(activateOption) {
        activateOption(cy);
      });

    },
  },

});
