import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Controller.extend(PaginatedControllerMixin, {

  queryParams: ['status', 'text', 'my', 'user'],

  page_size: 18,
  status: [10, 20, 30],
  text: null,
  my: false,
  user: null,


  init() {
    this._super(...arguments);
    this.uploadMetaDatas = [
      { type: 'text', label: 'Reaction name', field: 'name', bindFilename: true },
      { type: 'textarea', label: 'Description', field: 'description' },
    ];
  },

  WatchUpdateFilter: computed('TriggerUpdateFilter', function () {
    if (this.get('TriggerUpdateFilter')) {
      this.set('TriggerUpdateFilter', false)
      this.send('updateDataFilter')
    }
  }),

  actions: {
    updateDataFilter() {
      this.setFilter()
      this.send('updateDataPage', 'model', 1, this.get('filter'))
      return null
    }
  },

  setFilter() {
    let filter = {
      text: this.get('text'), status: this.get("status"), my: this.get('my'), user: this.get('user')
    }
    this.set('filter', filter)
  }

});
