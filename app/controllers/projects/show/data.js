import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(
  PaginatedControllerMixin, {

  queryParams: ['status'],
  status: [20, 30],
  selected: "all",

  genDataComponents: function() {
    this.setFilter()
    this.dataComponents['fragsample'] =
      { params: { page: 1, page_size: 10 } };
    this.dataComponents['frag-annotation'] =
      { routeLabel: 'frag-annotation', params: { page: 1, page_size: 6, filter: this.get('filter') } };
  },

  setFilter() {
    let filter = {
      status: this.get("status"),
      project_id: this.get('project_id'),
      selected: this.get('selected')
    }
    this.set('filter', filter)
  },

  actions: {
    setFragSample(fragSample) {
      let self = this;
      this.model.updateFragSample({
        frag_sample_id: fragSample.id,
      }).then(function(/*response*/) {
        self.model.reload().then(function() {
          self.genDataComponents();
          self.send('updateDataPage', 'frag-annotation', 1, self.get('filter'));
          self.set('selectFragModal', false);
        });
      });
    },
  },

});
