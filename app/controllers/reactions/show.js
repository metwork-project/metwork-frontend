import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

    image: "",
    currentUser: service('current-user'),

    actions: {
        save_reaction () {
            let this_ = this;
            let isNew = this.model.get('isNew');
            this.model.save().then(function() {
                if (isNew) {
                  this_.model.set('user', this.get('currentUser').user)
                  let id = this_.model.get('id');
                  this_.get('target').transitionTo('/reactions/'+ id);
                }
                this_.getImage();
            });
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
        testChemdoodle() {
          var sketcher = new ChemDoodle.SketcherCanvas('sketcher', 500, 300, {useServices:false, includeQuery: true})
          let this_=this
          setTimeout(function(){
            $('.molecule-editor').show()
            this_.set('sketcher', sketcher); }, 1000);
        },
        testExportJSON(){
          var mol = this.get('sketcher').getMolecule();
          // this line converts the Molecule data structure to the JSON protocol Javascript object
          var dummy = new ChemDoodle.io.JSONInterpreter().molTo(mol);
          alert(JSON.stringify(dummy));
        },
        testChemdoodleJSON() {
          var jsonstr = '{"m":[{"a":[{"x":125,"y":128.20001220703125,"i":"a0"},{"x":142.32050807568876,"y":118.20001220703125,"i":"a1"}],"b":[{"b":0,"e":1,"i":"b0"}]},{"a":[{"x":228,"y":121.20001220703125,"i":"a2"},{"x":245.32050807568876,"y":111.20001220703125,"i":"a3","l":"O"}],"b":[{"b":0,"e":1,"i":"b1"}]}],"s":[{"i":"s0","t":"Line","x1":172,"y1":104.20001220703125,"x2":198.0768096208106,"y2":104.20001220703125,"a":"synthetic"}]}'
          var jsi = new ChemDoodle.io.JSONInterpreter();
          // console.log(jsi);
          // var caffeine = jsi.molFrom(JSON.parse(cafJSON).m[0]);
          // var caffeine = jsi.contentFrom(JSON.parse(cafJSON));
          //caffeine.scaleToAverageBondLength(14.4);
          // console.log(viewACS);
          //viewACS.loadMolecule(caffeine);
          var target = jsi.contentFrom(JSON.parse(jsonstr));
          console.log(target);
          this.get('sketcher').loadContent(target.molecules, target.shapes);
          // var s = JSON.stringify(new ChemDoodle.io.JSONInterpreter().contentTo(this.get('sketcher').molecules, this.get('sketcher').shapes));console.log(s);alert(s);
        },
        testChemdoodle1() {
          var viewACS = new ChemDoodle.ViewerCanvas('sketcher', 100, 100);
          viewACS.specs.bonds_width_2D = .6;
          viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
          viewACS.specs.bonds_hashSpacing_2D = 2.5;
          viewACS.specs.atoms_font_size_2D = 10;
          viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
          viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
          // var targetMol = ChemDoodle.iChemLabs.readSMILES('N1(C)C(=O)N(C)C(C(=C1N1)N(C=1)C)=O', {}, function(mol){
          //   return mol;
          // });
          var caffeineMolFile = '\n     RDKit          2D\n\n  3  2  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2990    0.7500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5981   -0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\nM  END';
          var cafJSON = '{"m":[{"a":[{"x":290.3398,"y":146,"i":"a0"},{"x":307.6602,"y":156,"i":"a1"}],"b":[{"b":0,"e":1,"i":"b0"}]}]}'
          // var caffeine = ChemDoodle.readMOL(caffeineMolFile);
          console.log(JSON.parse(cafJSON).m[0]);
          var jsi = new ChemDoodle.io.JSONInterpreter();
          console.log(jsi);
          // var caffeine = jsi.molFrom(JSON.parse(cafJSON).m[0]);
          // var caffeine = jsi.contentFrom(JSON.parse(cafJSON));
          //caffeine.scaleToAverageBondLength(14.4);
          console.log(viewACS);
          //viewACS.loadMolecule(caffeine);
          viewACS.loadContent(caffeine);
        },
    },
    getImage: function() {
        let self = this;
        self.set('image', '');
        if(this.model.get('is_reactor')) {
          this.model.getImage()
              .then(function(response) {
                  self.set('image', response.data.image);
              });
        }
    },
});
