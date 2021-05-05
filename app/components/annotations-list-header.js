import Component from '@ember/component';
import { getFile } from 'metwork-frontend/utils/file-manager';


export default Component.extend({
    actions: {
        getFile(request, fileName) {
            return getFile(this, request, fileName)
        },
    }
});
