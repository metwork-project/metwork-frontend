import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    isSelected: computed('triggerSelected', function () {
        let itemIds = this.get('updatedItemIds')
        if (itemIds) {
            return itemIds.includes(parseInt(this.get('item').id))
        } else {
            return null
        }

    }),

    isSelectable: computed('item.status', function () {
        let itemIds = this.get('updatedItemIds')
        return itemIds && this.get('item').isActive
    }),


    actions: {
        toggleSlelect() {
            let itemIds = this.get('updatedItemIds')
            let itemId = parseInt(this.get('item').id)
            if (this.get('isSelected')) {
                const index = itemIds.indexOf(itemId);
                if (index > -1) {
                    itemIds.splice(index, 1);
                }
            } else {
                itemIds.push(itemId)
            }
            this.set("updatedItemIds", itemIds)
            this.set('triggerSelected', !this.get('triggerSelected'))
            this.set('hasChanges', true)
        }
    }
});
