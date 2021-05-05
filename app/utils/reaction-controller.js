import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(PaginatedControllerMixin, {

    queryParams: ['status', 'customParams.text', 'customParams.my', 'customParams.user', 'selected'],

    page_size: 18,
    customParams: {
        text: null,
        my: false,
        user: null,
    },

    getFilter() {
        let customParams = this.get('customParams')
        return {
            text: customParams.text,
            my: customParams.my,
            user: customParams.user,
            status: this.get("status"),
            project_id: this.get('project_id'),
            selected: this.get('selected')
        }
    },

    setFilter() {
        let filter = this.getFilter()
        this.set('filter', filter)
    },
});
