import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    updateFilter: false,
    inputSelected: "all",

    init() {
        this._super(...arguments);
        this.set('inputSelected', this.get('selected'))
        let selectedOptions = {
            all: "All",
            selected: "Selected",
            notselected: "Not Selected",
        }
        this.set("selectedOptions", selectedOptions)
        this.set('availableStatus', [])
        this.setCustomFileds()
    },

    setCustomFileds() {

    },

    getItemStatus() {
        return {}
    },

    itemStatus: computed('filter', function () {
        let availableStatus = this.get('availableStatus')
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


    updateFilterStatus(){
        let res = []
        this.itemStatus.forEach(status => {
            if (status.checked) {
                res.push(status.code)
            }
        });
        this.set("status", res)
    },
    updateCustomFilter() {

    },

    actions: {
        updateFilter() {
            this.updateFilterStatus()
            this.updateCustomFilter()
            this.set('TriggerUpdateFilter', true)
            this.set("selected", this.get('inputSelected'))
        },
        updateSelected(value){
            this.set('inputSelected', value)
        }
    }


});
