import Mixin from '@ember/object/mixin';
// import {cytoscape} from '@bower_components/cytoscape/dist';
import /*{ popper } from*/ 'cytoscape-popper';
import tippy from 'tippy.js';
import $ from 'jquery';
import CytoscapeStyleMixin from 'metwork-frontend/mixins/cytoscape-style';
import CytoscapeTipMixin from 'metwork-frontend/mixins/cytoscape-tip';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';

export default Mixin.create(
  CytoscapeStyleMixin,
  CytoscapeTipMixin,
  CytoscapeFilterMixin, {

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

    startCytoscape(data, graphStyle, activateOptions) {
      let _this = this;
      let cose =  {
        name: 'cose',
        nodeRepulsion: 40000,
        nodeOverlap: 20,
        // gravity: 1,
        animate: true,
        // componentSpacing: 100,
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
        style: this.cyStyle(graphStyle),
        layout: cose,
      });

      cy.graphStyle = graphStyle;
      cy.fit({padding: 20});

      this.set('cy',cy);

      var makeTip = function(node/*, loadContent*/) {
        // return new Promise(function(resolve /*, reject */) {
          var _makeTip = function(node) {
            return new Promise(function(resolve /*, reject */) {
              let tip = tippy( node.popperRef(), {
              html: (function(){
                var div = document.createElement('div');
                div.innerHTML = '<div class="content">Loading data ...</div>';
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
              node.tippy = tip;
              resolve(tip);
            });
          }

          _makeTip(node).then( function (tip) {
            node.tip = tip;
            node.hasTip = true;
            tip.show();
            _this.loadTipContent(node);
            resolve(tip);
          });
      }

      cy.nodes().on('mouseout', function(evt) {
        let nodeTarget = evt.target;
        if (nodeTarget.hasTip) {
            nodeTarget.tip.hide();
        }
      });

      cy.nodes().on('tap', function(evt) {

        let node = evt.target;
        if (cy.tippyActivated && !cy.onHold) {
          let nodeId = node.data('id')
          if (node.hasTip) {
            node.tip.show();
          } else {
            makeTip(node)
          }
        }
      });

      activateOptions.map( function(optionName) {
        _this.activateOption(cy, optionName);
      });



    },
  },

});
