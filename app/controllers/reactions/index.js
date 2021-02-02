import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Controller.extend(PaginatedControllerMixin, {

  filter: 'not_obsolete',
  page_size: 16,

  triggerFilter: computed('filter', function () {
    if (this.filter === 'not_obsolete') {
      return {
        filter: 'all',
        label: 'show obsolete'
      }
    } else if (this.filter === 'all') {
      return {
        filter: 'not_obsolete',
        label: 'hide obsolete'
      }
    }
  }),

  actions: {
    changeFilter(filter) {
      this.set('filter', filter)
      this.send('updateDataPage', 'model', 1, filter)
    }
  },

  init() {
    this._super(...arguments);
    this.uploadMetaDatas = [
      { type: 'text', label: 'Reaction name', field: 'name', bindFilename: true },
      { type: 'textarea', label: 'Description', field: 'description' },
    ];
  },

});
