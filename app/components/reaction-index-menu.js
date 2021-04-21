import Component from '@ember/component';
import { computed } from '@ember/object';
import { reactionStatus } from '../models/reaction'


export default Component.extend({

    reactionStatus: computed('filter', function () {
        let availableStatus = [10, 20, 30, 40]
        let res = Object.values(reactionStatus).reduce(
            (res, status) => {
                if (availableStatus.includes(status.code)) {
                    res.push({
                        code: status.code,
                        libelle: status.libelle,
                        checked: this.filter.status.includes(status.code)
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
            this.set("filter.status", res)
        }
    }

});
