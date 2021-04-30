import Component from '@ember/component';

export default Component.extend({
    actions: {
        createItem(modelName, model) {
            this.get("newItem")(modelName, model)
        },
    }
});
