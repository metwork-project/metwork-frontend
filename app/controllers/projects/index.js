import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { computed } from '@ember/object';

export default Controller.extend(
    PaginatedControllerMixin, {

    filter: "private",

    triggerFilter: computed('filter', function() {
        this.send('updateDataPage', 'model', 1, this.filter)
        return null
    }),

    isPublic: computed('filter', function() {
        return this.filter === "public"
    })

});
