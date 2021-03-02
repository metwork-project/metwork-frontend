import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        getFile(request, fileName) {
            this.send(
                'downloadFile',
                this.model,
                request,
                "text/plain;charset=utf-8",
                fileName
            );
        },
    }

});
