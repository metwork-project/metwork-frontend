import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Controller.extend(
  PaginatedControllerMixin,{

    genDataComponents:  function () {
        this.dataComponents['fragsample'] =
            { params : {page: 1, page_size: 10} };
        this.dataComponents['annotations-available'] =
            { routeLabel: 'frag-annotation', params : {project_id: this.model.id, page: 1, page_size: 10, selected: false} };
        this.dataComponents['annotations-selected'] =
            { routeLabel: 'frag-annotation', params : {project_id: this.model.id, page: 1, page_size: 10, selected: true} };
    },

});
