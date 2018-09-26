import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  sketcher: null,
  chemDoodleJSON: '',
  chemDoodleJSONStatus: 'stop',

  didRender() {
    this._super(...arguments);
    if (! this.get('editorLoaded')) {
      this.loadEditor();
    }
    this.set('editorLoaded', true)
  },

  canvasId: computed('skecthId', function() {
    return this.get('skecthId') + '-canvas'
  }),

  modalId: computed('skecthId', function() {
    return this.get('skecthId') + '-modal'
  }),

  udpdateChemDoodleJSONStatus: computed('chemDoodleJSONStatus', function() {
    if ( this.get('chemDoodleJSONStatus') === 'requested' && this.get('sketcher') ) {
      var mols = this.get('sketcher').getMolecules();
      var shapes = this.get('sketcher').shapes;
      // this line converts the Molecule data structure to the JSON protocol Javascript object
      var molJSON = new ChemDoodle.io.JSONInterpreter().contentTo(mols, shapes);
      this.sendAction('updateChemDoodleJSON', molJSON)
    }
  }),

  loadEditor: function() {
    ChemDoodle.default_atoms_useJMOLColors = true;
    var sketcher = new ChemDoodle.SketcherCanvas(this.get('canvasId'), 500, 300, {useServices:false, includeQuery: true})
    let this_=this
    setTimeout(function(){
      $('#' + this_.elementId + ' .molecule-editor-loader').hide()
      $('#' + this_.elementId + ' .molecule-editor-sketcher').show()
      this_.set('sketcher', sketcher); }, 500);
  },

  loadJSON(jsonData) {
    var jsi = new ChemDoodle.io.JSONInterpreter();
    var target = jsi.contentFrom(jsonData);
    var sketcher = this.get('sketcher')
    sketcher.historyManager.pushUndo( new ChemDoodle.uis.actions.SwitchContentAction(sketcher, target.molecules, target.shapes) );
  },

  actions: {
    loadSmarts() {
      var this_ = this
      var smarts = $('.modal.' + this.get('modalId') + ' .smarts-value')[0].value
      this.model.loadSmarts({smarts: smarts})
        .then(function(response) {
          this_.set('smartsModal', false);
          if (response.data.success) {
            this_.loadJSON(response.data.success);
        }
      })
    },
    getChemDoodleJSON: function() {
      return new Promise(function(resolve /*, reject */) {

      })
    },

    testExportJSON(){
      this.send('getChemDoodleJSON').then(function(jsonData) {
        alert(this.get('chemDoodleJSON'));
      })
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
      // console.log(JSON.parse(cafJSON).m[0]);
      var jsi = new ChemDoodle.io.JSONInterpreter();
      // console.log(jsi);
      // var caffeine = jsi.molFrom(JSON.parse(cafJSON).m[0]);
      // var caffeine = jsi.contentFrom(JSON.parse(cafJSON));
      //caffeine.scaleToAverageBondLength(14.4);
      // console.log(viewACS);
      //viewACS.loadMolecule(caffeine);
      viewACS.loadContent(caffeine);
    },
  },

});
