import Component from '@ember/component';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Component.extend(PaginatedControllerMixin, {

    actions: {
        updateDataComponentAction: function(dataLabel) {
					this.updateDataComponent(dataLabel);
				},
		},

});
