import Component from '@ember/component';
import { computed } from '@ember/object';
import { reactionStatus } from '../models/reaction'


export default Component.extend({

    inputText: null,
    inputMy: false,
    inputUser: null,
    updateFilter: false,
    inputSelected: "all",

    init() {
        this._super(...arguments);
        this.set('inputText', this.get('text'))
        this.set('inputMy', this.get('my'))
        this.set('inputUser', this.get('user'))
        this.set('inputSelected', this.get('selected'))
        let selectedOptions = {
            all: "All",
            selected: "Selected",
            notselected: "Not Selected",
        }
        this.set("selectedOptions", selectedOptions)
    },

    reactionStatus: computed('filter', function () {
        let availableStatus = [10, 20, 30, 40]
        let res = Object.values(reactionStatus).reduce(
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
            let my = this.get('inputMy')
            this.set("my", my)
            if (!my) {
                this.set("user", this.get('inputUser'))
            }
            this.set('TriggerUpdateFilter', true)
            this.set("selected", this.get('inputSelected'))
        },
        updateSelected(value){
            this.set('inputSelected', value)
        }
    }

});
