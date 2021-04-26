import $ from 'jquery';
import { computed } from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import FileManagerController from '../../file-manager-controller';

export default FileManagerController.extend(
    PaginatedControllerMixin, {

    status: [ 20, 30],

    genDataComponents: function () {
        this.dataComponents['frag-annotation'] =
            { params: { page: 1, page_size: 6, frag_sample_id: this.model.id } };
    },

    annotationCount: computed('frag-annotations.meta.pagination.{last.page,self.page}', function () {
        const total = this.get('frag-annotations.meta.pagination.last.page') || this.get('frag-annotations.meta.pagination.self.page');
        if (!total) return [];
        return new Array(total + 1).join('x').split('').map((e, i) => i + 1);
    }),

    actions: {
        annotationPage(page) {
            this.set('page', page);
            this.send('annotationPageQuery', this, this.model.id);
        },
        openAddAnnotModal() {
            //this.set("fileReady",false);
            //this.toggleModal(true);
            this.set("modalAddAnnot", true);
        },
        addAnnotation() {
            let form_target = $('form.add_annotation');
            let params = {
                ionId: form_target.find('input.ion-id').val(),
                smiles: form_target.find('input.smiles').val(),
                dbSource: form_target.find('input.db-source').val(),
                dbId: form_target.find('input.db-id').val(),
                fragsample_id: this.model.id,
            }
            //this.toggleModal(false);
            this.send('addAnnotationQuery', params, this);
        },
    },

});
