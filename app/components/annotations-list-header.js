import Component from '@ember/component';
import { getFile } from 'metwork-frontend/utils/file-manager';
import { computed } from '@ember/object';

export default Component.extend({
    actions: {
        getFile(request, fileName) {
            return getFile(this, request, fileName)
        },
    },

    uploadAnnotRouteLabel: computed("model.id", function(){
        return 'fragsamples/' + this.get('model').id + '/uploadfile_annotation'
    })
});
