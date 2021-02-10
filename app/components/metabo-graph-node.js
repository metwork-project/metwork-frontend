import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import ENV from 'metwork-frontend/config/environment';
import { inject as service } from '@ember/service';

export default Component.extend({

    session: service('session'),

    nodeName: computed('nodeData.id', function () {
        let nodeData = this.get("nodeData")
        if (nodeData.nodeType === "reaction") {
            return nodeData.name
        }
    }),

    displayMolDraw: computed('nodeData.id', function () {
        let nodeData = this.get("nodeData")
        $("#chem-draw").empty().append('<canvas id="chem-draw-' + nodeData.id + '">mol</canvas>');
        switch (nodeData.nodeType) {
            case 'molecule':
                this.displayMolecule(nodeData)
                break
            case 'reaction':
                this.displayReaction(nodeData)
                break
        }
    }),

    cosineData: computed('nodeData.id', function () {
        let cosine = this.get("nodeData").cosine
        if (cosine) {
            return cosine.split(" | ").map(x => {
                let data = x.split(" : ")
                return { ionId: parseInt(data[0]), cosine: data[1] }
            });
        } else {
            return null
        }

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



    displayReaction: function (node) {
        let canvasId = "chem-draw-" + node.id
        let dataJSON = node.reactJSON
        if (dataJSON) {
            this.noLabel = true
            var viewACS = new ChemDoodle.ViewerCanvas(
                canvasId,
                300,
                200);
            if (this.noLabel) {
                let line = {}
                dataJSON.s.map(function (shape) {
                    if (shape.t === 'Line') {
                        line = shape
                    }
                });
                dataJSON.s = [line]
            }
            var jsi = new ChemDoodle.io.JSONInterpreter();
            var target = jsi.contentFrom(dataJSON)
            if (!this.noLabel) {
                var l = 0
                target.shapes.map(function (shape) {
                    shape.label = l
                    shape.error = true
                    l += 1
                })
            }
            viewACS.loadContent(target.molecules, target.shapes);
        }

    },

    actions: {
        copySmiles() {
            var target = document.getElementById('node-smiles');
            target.select();
            document.execCommand("copy");
        },
        annotateIon(ionId) {
            let project = this.get("project")
            let project_id = project.get("id")
            let fragsample_id = project.get("frag_sample.id")
            let smiles = this.get("nodeData").smiles
            let access_token = this.get('session.data.authenticated.token');
            let name = 'metwork_sample_' + fragsample_id + " - " + this.get("nodeData").parentMass;
            let form_data = new FormData();
            form_data.append('ion_id', ionId);
            form_data.append('name', name);
            form_data.append('smiles', smiles);
            form_data.append('status_id', 20);
            form_data.append('db_source', 'metwork_project_' + project_id);
            form_data.append('db_id', 'ion_' + ionId);
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Token ${access_token}`);
                },
                url: ENV.host + '/' + ENV.APInameSpace + '/fragsamples/' + fragsample_id + '/add_annotation',
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'POST',
            }).then(response => {
                this.get("reloadMetabolizationNetwork")(true)
            }, (xhr, status, error) => {
                console.log(error)
            });
        },
    },
})