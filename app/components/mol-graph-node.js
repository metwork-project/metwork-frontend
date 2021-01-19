import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    displayMolDraw: computed('nodeData.id', function () {
        let nodeData = this.get("nodeData")
        this.$("#chem-draw").empty().append('<canvas id="chem-draw-' + nodeData.id + '" class="chemical-select-item">mol</canvas>');
        this.displayMolecule(nodeData)
    }),

    displayMolecule: function (node) {
        ChemDoodle.default_atoms_useJMOLColors = true;
        var viewACS = new ChemDoodle.TransformCanvas("chem-draw-" + node.id, 250, 250);
        viewACS.specs.bonds_width_2D = .6;
        viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
        viewACS.specs.bonds_hashSpacing_2D = 2.5;
        viewACS.specs.atoms_font_size_2D = 10;
        viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
        viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
        var jsi = new ChemDoodle.io.JSONInterpreter();
        var moltarget = jsi.molFrom(node.molJSON)
        moltarget.scaleToAverageBondLength(14.4);
        viewACS.loadMolecule(moltarget);
    },


    actions: {
        copySmiles() {
            var target = document.getElementById('node-smiles');
            target.select();
            document.execCommand("copy");
        },
    },

});
