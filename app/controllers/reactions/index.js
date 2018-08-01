import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(PaginatedControllerMixin, {

    init() {
        this._super(...arguments);
        this.uploadMetaDatas = [
            {type: 'text', label: 'Reaction name', field: 'name', bindFilename: true},
            {type: 'textarea', label: 'Description', field: 'description'},
        ];
    },



});
