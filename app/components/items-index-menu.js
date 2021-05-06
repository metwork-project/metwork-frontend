import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    updateFilter: false,

    init() {
        this._super(...arguments);
        let selectedOptions = {
            all: "All",
            selected: "Selected",
            notselected: "Not Selected",
        }
        this.set("selectedOptions", selectedOptions)
    },

    itemStatus: computed('filter', function() {
        let availableStatus = this.get('availableStatus', [])
        let res = Object.values(this.getItemStatus()).reduce(
            (res, status) => {
                if (availableStatus.includes(status.code)) {
                    res.push({
                        code: status.code,
                        libelle: status.libelle,
                        class: status.class,
                        checked: this.get('status').includes(status.code)
                    })
                }
                return res
            }
            , [])
        return res
    }),

    updateFilterStatus() {
        if (!this.get('projectView') || this.get('projectViewStatus')) {
            let res = []
            this.itemStatus.forEach(status => {
                if (status.checked) {
                    res.push(status.code)
                }
            });
            this.set("status", res)
        }
    },

    changetriggerSelected() { this.set("triggerSelected", !this.triggerSelected) },

    actions: {
        triggerFilter() {
            this.updateFilterStatus()
            this.set("TriggerUpdateFilter", !this.get("TriggerUpdateFilter"))
        },
        updateSelected(value) {
            this.set('selected', value)
        },
        addItems() {
            this.set('triggerAddItems', !this.get('triggerAddItems'))
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
        },
    }
});
