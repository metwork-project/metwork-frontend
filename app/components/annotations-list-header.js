import Component from '@ember/component';
import { getFile } from 'metwork-frontend/utils/file-manager';


export default Component.extend({
    actions: {
        getFile(request, fileName) {
            console.log("header", this.get('model'))
            return getFile(this, request, fileName)
        },
    }
});
