import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import $ from 'jquery';
import CytoscapeStyleMixin from 'metwork-frontend/mixins/cytoscape-style';
import { activateOption } from 'metwork-frontend/mixins/cytoscape-filter';

export default Mixin.create(
  CytoscapeStyleMixin,
  {

    nodeData: "",
    isGraphFullScreen: false,

    GraphFitFullScreen: computed('isGraphFullScreen', function () {
      let cy = this.get("cy")
      let transitionTime = 200
      if (this.get("isGraphFullScreen")) {
        transitionTime += 300
      }
      if (cy) {
        cy.elements().hide()
        setTimeout(() => {
          cy.elements().show()
          cy.fit()
        }, transitionTime)
      }
    }),

    actions: {
      startCytoscape(data, graphStyle, activateOptions) {
        let _this = this;
        let cose = {
          name: 'cose',
          nodeRepulsion: 40000,
          // nodeOverlap: 20,
          // gravity: 2,
          animate: false,
          componentSpacing: 100,
        };
        this.set('layout', cose);
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
        cy.fit({ padding: 20 });

        this.set('cy', cy);

        cy.nodes().on('tap', function (evt) {

          let node = evt.target;
          cy.nodes('.node-select').removeClass('node-select');
          node.addClass('node-select');
          let nodeData = {
            id: node.data('id'),
            name: node.data('name'),
            parentMass: node.data('parent_mass'),
            info: node.data('info'),
            nodeType: node.data('nodeType'),
            annotationStatusId: node.data('annotationStatusId'),
            annotationId: node.data('annotationId'),
            smiles: node.data('smiles'),
            cosine: node.data('cosine'),
            publicProjects: node.data('public_projects'),
            molJSON: node.data("molJSON"),
            reactJSON: node.data("reactJSON"),
            bestAnnotation: node.data("bestAnnotation"),
          }
          _this.set("nodeData", nodeData)
        });

        activateOptions.map(function (optionName) {
          activateOption(cy, optionName);
        });

        this.set('spinnerStatus', 'stop');

        cy.on('destroy', function (/*evt*/) {
          _this.set('spinnerStatus', 'waiting')
        })
      },
    },

  });
