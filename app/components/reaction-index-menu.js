import Component from '@ember/component';
import { computed } from '@ember/object';
import { reactionStatus } from '../models/reaction'


export default Component.extend({

    inputText: null,
    updateFilter: false,

    init() {
        this._super(...arguments);
        this.set('inputText', this.get('text'))
    },

    reactionStatus: computed('filter', function () {
        let availableStatus = [10, 20, 30, 40]
        let res = Object.values(reactionStatus).reduce(
            (res, status) => {
                if (availableStatus.includes(status.code)) {
                    res.push({
                        code: status.code,
                        libelle: status.libelle,
                        checked: this.get('status').includes(status.code)
                    })
                }
                return res
            }
            , [])
        return res
    }),

    actions: {
        updateFilter() {
            let res = []
            this.reactionStatus.forEach(status => {
                if (status.checked) {
                    res.push(status.code)
                }
            });
            this.set("status", res)
            this.set("text", this.get('inputText'))
            this.set('TriggerUpdateFilter', true)
        }
    }

});
