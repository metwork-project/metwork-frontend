import Component from '@ember/component';
import { computed } from '@ember/object';
import { reactionStatus } from '../models/reaction'


export default Component.extend({



    reactionStatus: computed('filter', function() {
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

    isChecked: function(status) {
        return status in this.filter.status
    },

    actions: {
        updateFilter() {
            let res = []
            console.log("updateFilter", this.reactionStatus)
            this.reactionStatus.forEach(status => {
                if (status.checked) {
                    res.push(status.code)
                }
            });
            console.log("res", res)
            // let filter = this.get("filter")
            // filter.status = res
            this.set("filter.status", res)
            console.log(this.get("filter"))
        }
    }

});