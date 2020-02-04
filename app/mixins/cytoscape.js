import Mixin from '@ember/object/mixin';
// import {cytoscape} from '@bower_components/cytoscape/dist';
import /*{ popper } from*/ 'cytoscape-popper';
import tippy from 'tippy.js';
import $ from 'jquery';
import CytoscapeStyleMixin from 'metwork-frontend/mixins/cytoscape-style';
import CytoscapeTipMixin from 'metwork-frontend/mixins/cytoscape-tip';
import { activateOption } from 'metwork-frontend/mixins/cytoscape-filter';

export default Mixin.create(
  CytoscapeStyleMixin,
  CytoscapeTipMixin, {

  actions: {
    startCytoscape(data, graphStyle, activateOptions) {
      let _this = this;
      let cose =  {
        name: 'cose',
        nodeRepulsion: 40000,
        // nodeOverlap: 20,
        // gravity: 2,
        animate: false,
        componentSpacing: 100,
      };
      this.set('layout', cose);
      // cytoscape.use( popper );
      var cy = cytoscape({
        container: $('#cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        maxZoom: 10,
        minZoom: 0.1,
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
            let ref = node.popperRef();
            let dummyDomEle = document.createElement('div');
            return new Promise(function(resolve /*, reject */) {

              let tip = tippy( dummyDomEle, {
                trigger: 'manual',
                lazy: false,
                onCreate: instance => { instance.popperInstance.reference = ref; },
                content: () => {
                  var div = document.createElement('div');
                  div.innerHTML = '<div class="contentt">Loading data ...</div>';
                  return div;
                },

                arrow: true,
                // placement: 'bottom',
                theme: 'light',
                hideOnClick: false,
                multiple: false,
                // sticky: true,
                duration: 0,
              } ); //.tooltips[0];
              node.tippy = tip;
              resolve(tip);
            });
          }

          _makeTip(node).then( function (tip) {
            node.tip = tip;
            node.hasTip = true;
            tip.show();
            _this.loadTipContent(node);
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
        if (cy.tipActivated && !cy.onHold) {
          if (node.hasTip) {
            node.tip.show();
          } else {
            makeTip(node)
          }
        }
      });

      activateOptions.map( function(optionName) {
        activateOption(cy, optionName);
      });

      this.set('spinnerStatus', 'stop');

      cy.on('destroy', function(/*evt*/) {
        _this.set('spinnerStatus','waiting')
      })
    },
  },

});
