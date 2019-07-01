import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    classComputed: computed('activeList', function() {
        if (this.item === this.activeList) {
            return "active bg-primary"
        } else {
            return "text-primary"
        }
    }),

    actions: {
        toggleItem() {
            this.set("activeList", this.item)
        }
    }

});
