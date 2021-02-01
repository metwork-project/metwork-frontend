import Component from '@ember/component';

export default Component.extend({

    closeModal() {
        this.set('annotation', false);
    },

    actions: {
        closeModal() {
            this.closeModal();
        },
        setStatus(value) {
            this.set("annotation.status_id", value)
        },
        updateData() {
            this.get("annotation").save()
            this.closeModal();
        },
    }
});
