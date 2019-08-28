import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(PaginatedControllerMixin, {

    init() {
        this._super(...arguments);
        this.uploadMetaDatas = [
            {type: 'text', label: 'Sample name', field: 'name', bindFilename: true},
            {type: 'textarea', label: 'Description', field: 'description'},
            {
                type: 'select',
                label:'Ion charge',
                field: 'ion_charge',
                values: [
                    {
                        value: 'positive', 
                        label: 'positive'
                    },
                    {
                        value: 'negative', 
                        label: 'negative'
                    },
                ]
            },
        ];
    },

});
