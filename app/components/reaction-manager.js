import ItemsManager from 'metwork-frontend/components/items-manager';


export default ItemsManager.extend(
    {

        queryParams: ['status', 'text', 'my', 'user', 'selected'],

        page_size: 18,
        status: [10, 20, 30],
        text: null,
        my: false,
        user: null,
        dataLabel: 'reaction',


        getFilter() {
            return {
                text: this.get('text'),
                status: this.get("status"),
                my: this.get('my'),
                user: this.get('user'),
                project_id: this.get('project_id'),
                selected: this.get('selected')
            }
        },



    });
