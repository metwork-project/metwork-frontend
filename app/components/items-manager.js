import Component from '@ember/component';
import { computed } from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Component.extend(
    PaginatedControllerMixin, 
    {

    selected: "all",
    triggerSelected: false,

    WatchUpdateFilter: computed('TriggerUpdateFilter', function() {
        if (this.get('TriggerUpdateFilter')) {
            this.send('updateDataFilter')
        }
        return null
    }),

    selectedCount: computed('triggerSelected', function() {
        return this.get('updatedItemIds').length
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
        selectAll() {
            this.setFilter()
            let this_ = this
            this.get('store').query(this.get('dataLabel'), { only_ids: true, filter: this.get("filter") }).then(
                function(response) {
                    this_.set("updatedItemIds", response.meta.ids)
                    this_.changetriggerSelected()
                    this_.set('hasChanges', true)
                })
        },
        deSelectAll() {
            this.set("updatedItemIds", [])
            this.changetriggerSelected()
            this.set('hasChanges', true)
        },
        cancelSelect() {
            this.set("updatedItemIds", [...this.get('initItemIds')])
            this.changetriggerSelected()
            this.set('hasChanges', false)
        }
    },

    changetriggerSelected() { this.set("triggerSelected", !this.triggerSelected) },

    setFilter() {
        this.set('filter', this.getFilter())
    }
});
