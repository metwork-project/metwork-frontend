import Controller from '@ember/controller';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';

export default Controller.extend(
  CytoscapeMixin,
  CytoscapeFilterMixin, {

  spinnerStatus: 'waiting',

  actions: {
    loadMolecularNetwork() {
      this.set('spinnerStatus', 'loading');
      let _this = this
      this.model.molecularNetwork().then( function(response) {
        _this.send(
          'startCytoscape',
          response,
          'molecular',
          ['highlight', 'tip'] );
          // ['filter', 'highlight', 'tippy'] );
      }) ;
    },

    stopLoading() {
      this.set('spinnerStatus', 'stop');
    },
  }

});
