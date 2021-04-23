import Component from '@ember/component';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';

export default Component.extend(PaginatedControllerMixin, {

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

    WatchUpdateFilter: computed('TriggerUpdateFilter', function() {
        if (this.get('TriggerUpdateFilter')) {
            this.send('updateDataFilter')
        }
        return null
    }),

    actions: {
        updateDataFilter() {
            this.set('TriggerUpdateFilter', false)
            this.setFilter()
            this.get('updateDataPage')(this.get('modelName'), 1, this.get('filter'))
            return null
        },
        createItem(modelName, model){
            this.get("newItem")(modelName, model)
        }
    },

    setFilter() {
        let filter = {
            text: this.get('text'), status: this.get("status"), my: this.get('my'), user: this.get('user')
        }
        this.set('filter', filter)
    }


});
