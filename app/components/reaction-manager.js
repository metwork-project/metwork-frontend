import Component from '@ember/component';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';


export default Component.extend(PaginatedControllerMixin, {

    queryParams: ['status', 'text', 'my', 'user', 'selected'],

    page_size: 18,
    status: [10, 20, 30],
    text: null,
    my: false,
    user: null,
    selected: "all",
    triggerSelected: false,

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

    selectedCount: computed('triggerSelected', function() {
        return this.get('updatedReactionIds').length
    }),

    actions: {
        addItems() {
            this.set('triggerAddItems', !this.get('triggerAddItems'))
        },
        updateDataFilter() {
            this.set('TriggerUpdateFilter', false)
            this.setFilter()
            this.get('updateDataPage')(this.get('modelName'), 1, this.get('filter'))
            return null
        },
        createItem(modelName, model) {
            this.get("newItem")(modelName, model)
        },
        selectAll() {
            this.setFilter()
            let this_ = this
            this.get('store').query('reaction', { only_ids: true, filter: this.get("filter") }).then(
                function(response) {
                    this_.set("updatedReactionIds", response.meta.ids)
                    this_.changetriggerSelected()
                    this_.set('hasChanges', true)
                })
        },
        deSelectAll() {
            this.set("updatedReactionIds", [])
            this.changetriggerSelected()
            this.set('hasChanges', true)
        },
        cancelSelect() {
            this.set("updatedReactionIds", [...this.get('initReactionIds')])
            this.changetriggerSelected()
            this.set('hasChanges', false)
        }
    },

    changetriggerSelected() { this.set("triggerSelected", !this.triggerSelected) },

    setFilter() {
        let filter = {
            text: this.get('text'),
            status: this.get("status"),
            my: this.get('my'),
            user: this.get('user'),
            project_id: this.get('project_id'),
            selected: this.get('selected')
        }
        this.set('filter', filter)
    }


});
