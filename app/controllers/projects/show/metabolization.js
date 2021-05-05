import { computed } from '@ember/object';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import ReactionController from 'metwork-frontend/utils/reaction-controller';

export default ReactionController.extend(
  CytoscapeMixin, {

  cosineDisplayed: false,
  spinnerStatus: 'waiting',
  displayNodeName: 'parent_mass',
  status: [30],
  selected: "all",
  hasChanges: false,

  genDataComponents: function () {
    this.setFilter()
    this.dataComponents['reactions'] =
      { routeLabel: 'reaction', params: { page: 1, page_size: 15, filter: this.get('filter') } };
  },


  actions: {
    toggleDisplayNodeName() {
      var field = 'best_cosine';
      if (this.get('displayNodeName') === 'parent_mass') {
        field = 'best_cosine';
      } else {
        field = 'parent_mass';
      }
      this.get('cy').nodes('[nodeType = "molecule"]').forEach(function (node) {
        if (node.data(field)) {
          node.data('name', node.data(field));
        } else {
          node.data('name', '');
        }
      })
      this.set('displayNodeName', field)
    },
    reloadMetabolizationNetwork(force) {
      this.set("nodeData", null)
      var cy = this.get('cy');
      if (cy) {
        cy.elements().remove();
      }
      this.loadMetabolizationNetwork(force);
    },
    downloadSVG() {
      var cy = this.get('cy');
      if (cy) {
        var svgContent = cy.svg({ scale: 1, full: true });
        var blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
        saveAs(blob, "demo.svg");
      }
    }
  },

  additionalActions: computed(function () {
    return [
      {
        call: 'selectReactionsByTag',
        label: 'Auto select by tag'
      }
    ]
  }),

  hasReaction: function (reactionId) {
    return reactionId in this.get('model.reactions_ids');
  },

  loadMetabolizationNetwork: function (force) {
    let _this = this
    this.set('spinnerStatus', 'loading');
    if (!force) {
      force = false
    }
    this.model.metabolizationNetwork({ force: force }).then(function (response) {
      _this.send(
        'startCytoscape',
        response,
        'metabolization',
        ['filter', 'highlight']);
    });
  },

  manageMetabolizationNetwork: computed('model.activeNav', function () {
    if (this.get('model').activeNav == 'metabolization') {
      this.loadMetabolizationNetwork();
    } else if (this.get('cy')) {
      this.get('cy').destroy()
    }
    return 0
  }),
});
