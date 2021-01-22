import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    statusDict: function () {
        return {
            0: { label: 'undefined', class: "secondary" },
            10: { label: 'explored', class: "secondary" },
            20: { label: 'putative', class: "warning" },
            30: { label: 'validated', class: "success" },
            90: { label: 'error', class: "error" },
        }
    },

    statusDisplay: computed('statusId', function () {
        let statusId = this.get("statusId")
        return this.statusDict()[statusId]
    }),
});
