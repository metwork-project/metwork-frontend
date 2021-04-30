import ItemsManager from 'metwork-frontend/components/items-manager';

let annotationStatus = {
    INIT: { code: 0, libelle: 'undefined', class: 'secondary' },
    EDIT: { code: 10, libelle: 'unrated', class: 'secondary' },
    VALID: { code: 20, libelle: 'putative', class: 'warning' },
    ACTIVE: { code: 30, libelle: 'validated', class: 'success' },
    ERROR: { code: 90, libelle: 'error', class: 'danger' },
}

export default ItemsManager.extend({

    availableStatus: [0, 10, 20, 30],
    itemIdsLabel: "annotation_ids",

    getItemStatus() {
        return annotationStatus
    },

    getFilter() {
        return {
            status: this.get("status"),
            project_id: this.get('project_id'),
            selected: this.get('selected')
        }
    },

});
