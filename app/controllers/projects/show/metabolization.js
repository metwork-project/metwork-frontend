import Controller from '@ember/controller';
import { computed } from '@ember/object';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(
  CytoscapeMixin,
  CytoscapeFilterMixin,
  PaginatedControllerMixin,{

  cosineDisplayed: false,
  spinnerStatus: 'waiting',
  displayNodeName: 'parent_mass',

  genDataComponents:  function () {
      this.dataComponents['reactions-available'] =
          { routeLabel: 'reaction', params : {project_id: this.model.id, page: 1, page_size: 10, selected: false} };
      this.dataComponents['reactions-selected'] =
          { routeLabel: 'reaction', params : {project_id: this.model.id, page: 1, page_size: 10, selected: true} };
  },

  actions: {
    toggleDisplayNodeName() {
      var field = 'best_cosine';
      if (this.get('displayNodeName') === 'parent_mass') {
        field = 'best_cosine';
      } else {
        field = 'parent_mass';
      }
      this.get('cy').nodes('[nodeType = "molecule"]').forEach( function(node) {
        if (node.data(field)){
          node.data('name', node.data(field));
        } else {
          node.data('name', '');
        }
      })
      this.set('displayNodeName', field)
    },
    reloadMetabolizationNetwork() {
      var cy = this.get('cy');
      if (cy) {
        cy.elements().remove();
      }
      this.loadMetabolizationNetwork();
    },
  },

  hasReaction: function(reactionId) {
      return reactionId in this.get('model.reactions_ids');
  },

  loadMetabolizationNetwork: function() {
    let _this = this
    this.set('spinnerStatus', 'loading');
    this.model.metabolizationNetwork().then( function(response) {
      _this.send(
        'startCytoscape',
        response,
        'metabolization',
        ['filter', 'highlight', 'tip'] );
    }) ;
  },

  manageMetabolizationNetwork: computed('model.activeNav', function() {
    if (this.get('model').activeNav == 'metabolization') {
      this.loadMetabolizationNetwork();
    } else if (this.get('cy')) {
      this.get('cy').destroy()
    }
  }),
});
