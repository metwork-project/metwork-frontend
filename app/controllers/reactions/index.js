import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Controller.extend(PaginatedControllerMixin, {

    filter: 'is_active',

    actions: {
      changeFilter(filter) {
        let this_ = this;
        this.set('filter', filter);
        this.store.query('reaction',this.queryParams)
                .then( function (model) {
                  this_.set('model',model  )
                });
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
