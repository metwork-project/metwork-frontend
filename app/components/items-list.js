import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    selectedCount: computed('triggerSelected', function() {
        return this.get('updatedItemIds').length
    }),
});
