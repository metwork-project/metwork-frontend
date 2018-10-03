import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Controller.extend(PaginatedControllerMixin, {

    // filter: 'not_obsolete',

    triggerFilter: computed('filter', function() {
      if (this.filter === 'not_obsolete') {
        return {
          filter: 'all',
          label: 'All Reactions'
        }
      } else if (this.filter === 'all') {
        return {
          filter: 'not_obsolete',
          label: 'Not obsolete'
        }
      }
    }),

    actions: {
      changeFilter(filter) {
        this.set('filter', filter);
        this.send('updateDataFilter', 'model', filter)
      }
    },

    init() {
        this._super(...arguments);
        this.uploadMetaDatas = [
            {type: 'text', label: 'Reaction name', field: 'name', bindFilename: true},
            {type: 'textarea', label: 'Description', field: 'description'},
        ];
    },

});
