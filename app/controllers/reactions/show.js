import Controller from '@ember/controller';

export default Controller.extend({

    image: "",

    actions: {
        save_reaction () {
            let self = this;
            this.model.save().then(function() {
                self.getImage();
            })
        },
        runReaction() {
            let self = this;
            this.model.runReaction({smiles: this.reactants})
                .then(function(response) {
                let display = response.data.products.reduce(
                    function (disp, value, ind) {
                        if (ind === 0) {
                            return value;
                        } else {
                            return disp + '\n' +  value;
                        }
                    }, '')
                self.set('products',display);

            });
        },
    },

    getImage: function() {
        let self = this;
        this.model.getImage()
            .then(function(response) {
                self.set('image', response.data.image);
            });
    },

});
