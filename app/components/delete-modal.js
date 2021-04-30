import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    deleteDataOpenModal: computed('dataToDelete', function () {
        if (this.dataToDelete) {
            this.set("deleteDataModal", true);
        }
    }),

    closeModal() {
        this.set('dataToDelete', false);
        this.set("deleteDataModal", false);
    },

    actions: {
        closeDeleteModal() {
            this.closeModal();
        },
        deleteData() {

            let self = this;
            let data = this.get('dataToDelete')
            let dataLabel = this.dataLabel
            data.deleteRecord();
            data.save().then((/*response*/) => {
                self.sendAction('updateDataController', dataLabel);
            });
            this.closeModal();
        },
    },

});
