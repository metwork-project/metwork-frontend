import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export default Mixin.create({

  loadTipContent: function(node) {
    ChemDoodle.default_atoms_useJMOLColors = true;
    switch (node.data('nodeType')) {
      case 'molecule':
        this.tipAnnotation(node);
        break;
      case 'reaction':
        this.tipReaction(node);
        break;
      case 'ion':
        this.tipIon(node);
    }
  },

  updateTipContent: function(tip, newContent) {
    var tipContent =  $('#' + tip.popper.id + ' .content');
    tip.hide();
    tipContent.html(newContent);
    tip.show();
    return tipContent;
  },

  tipAnnotation: function(node) {

    var newContent = this.moleculeElement(
      node.data('id'),
      node.data('smiles'),
      node.data('cosine'));
    this.updateTipContent(node.tip, newContent);

    this.displayMolecule(node);
  },

  tipReaction: function(node) {
    let this_ = this;
    let canvasId =   node.data('id')
    let dataJSON = node.data('reactJSON')
    if (dataJSON) {
      var newContent = `<canvas
        class="ChemDoodleWebComponent molecule"
        id="${canvasId}" width="300" height="200"
        alt="ChemDoodle Web Component"
        style="width: 300px; height: 200px; background-color: rgb(255, 255, 255);">
          This browser does not support HTML5/Canvas.
      </canvas>`
      this.updateTipContent(node.tip, newContent);
      this.noLabel = true
      var viewACS = new ChemDoodle.ViewerCanvas(
        canvasId,
        300,
        200);
      if (this.noLabel) {
        let line = {}
        dataJSON.s.map(function(shape, index) {
          if (shape.t === 'Line') {
            line = shape
          }
        });
        dataJSON.s = [line]
      }
      var jsi = new ChemDoodle.io.JSONInterpreter();
      var target = jsi.contentFrom(dataJSON)
      if (! this.noLabel) {
        var l = 0
        target.shapes.map(function(shape, index) {
          shape.label = l
          shape.error = true
          l += 1
        })
      }
      viewACS.loadContent(target.molecules, target.shapes);
    } else {
      this_.get('store').findRecord(
        'reaction', node.data('reactionId'), { reload: true })
        .then( function (response) {
          response.getImage().then(function(response) {
             let newContent =`
               <div>
                 ${response.data.image}
               </div>
             `;
             //<p>${ node.data('name')}</p>
             this_.updateTipContent(node.tip, newContent);
             $('#' + node.tip.popper.id + ' svg').attr('width',200).attr('height',100).attr('viewBox', '0 0 400 200');
          });
        }
      );
    }

  },

  tipIon: function(node) {
    var info = node.data('info');
    var bestAnnotation = node.data('bestAnnotation');
    var newContent = ''
    if (bestAnnotation.smiles) {
      newContent = `
        <div class='row'>
          <div class='col-6'>
            ${this.moleculeElement(
              node.data('id'),
              bestAnnotation.smiles,
              bestAnnotation.cosine)}
          </div>
          <div class='col-6'>
            ${info}
          </div>
        </div>`;
    } else {
      newContent = `
        <p>
          ${info}
        </p>`;
    }

    this.updateTipContent(node.tip, newContent);

    if (bestAnnotation.smiles) {
      this.displayMolecule(node);
    }
  },

  displayMolecule: function(node) {

    var viewACS = new ChemDoodle.TransformCanvas(node.data('id'), 200, 200);
    viewACS.specs.bonds_width_2D = .6;
    viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
    viewACS.specs.bonds_hashSpacing_2D = 2.5;
    viewACS.specs.atoms_font_size_2D = 10;
    viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
    viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
    var jsi = new ChemDoodle.io.JSONInterpreter();
    var moltarget = jsi.molFrom(node.data('molJSON'))
    moltarget.scaleToAverageBondLength(14.4);
    viewACS.loadMolecule(moltarget);
    $('#' + node.tip.popper.id + ' .smiles-display .btn').click( function (/*event*/) {
      var target = document.getElementById(`smiles-${node.data('id')}`);
      target.select();
      document.execCommand("copy");
    })
  },

  moleculeElement: function(id, smiles, cosine) {
    var cosineDisplay = '';
    if (cosine) {
      cosineDisplay = `
        <p>
          cosine: ${cosine}
        </p>`;
    }
    return `
      <div class="molecule">
        <canvas
          class="ChemDoodleWebComponent molecule"
          id="${id}" width="200" height="200"
          alt="ChemDoodle Web Component"
          style="width: 100px; height: 100px; background-color: rgb(255, 255, 255);">
            This browser does not support HTML5/Canvas.
        </canvas>
        <div class='smiles-display'>
          <input class='value' type="text" value=${smiles} id="smiles-${id}">
          <button type="button" class="btn btn-light btn-sm">Copy</button>
        </div>
        ${cosineDisplay}
      </div>`;
  },

});
