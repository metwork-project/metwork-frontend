import Component from '@ember/component';

let annotationStatus = {
    INIT: { code: 0, libelle: 'undefined', class: 'secondary' },
    EDIT: { code: 10, libelle: 'unrated', class: 'secondary' },
    VALID: { code: 20, libelle: 'putative', class: 'warning' },
    ACTIVE: { code: 30, libelle: 'validated', class: 'success' },
    ERROR: { code: 90, libelle: 'error', class: 'danger' },
  }

export default Component.extend({

    availableStatus: [0, 10, 20, 30],

    getItemStatus() {
        return annotationStatus
    },
});
