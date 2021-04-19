import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Controller.extend(PaginatedControllerMixin, {

  page_size: 18,

  triggerStatus: computed('filter.status', function() {
    this.send('updateDataPage', 'model', this.get("page"), this.get("filter"))
    return null
  }),

  init() {
    this._super(...arguments);
    this.uploadMetaDatas = [
      { type: 'text', label: 'Reaction name', field: 'name', bindFilename: true },
      { type: 'textarea', label: 'Description', field: 'description' },
    ];
  },

});
