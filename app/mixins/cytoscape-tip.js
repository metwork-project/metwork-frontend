import Mixin from '@ember/object/mixin';

export default Mixin.create({

  loadTipContent: function(node) {
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
    var tipContent = this.updateTipContent(node.tip, newContent);

    this.displayMolecule(node);
  },

  tipReaction: function(node) {
    let this_ = this;
    this_.get('store').findRecord(
      'reaction', node.data('reactionId'), { reload: true })
      .then( function (response) {
        response.getImage().then(function(response) {
           let newContent =`
             <div>
               ${response.data.image}
             </div>
             <p>${ node.data('name')}</p>
           `;
           var tipContent = this_.updateTipContent(node.tip, newContent);
           $('#' + node.tip.popper.id + ' svg').attr('width',200).attr('height',100).attr('viewBox', '0 0 400 200');
        });
      }
    );
  },

  tipIon: function(node) {
    var info = node.data('info');
    var bestAnnotation = node.data('bestAnnotation');

    if (bestAnnotation.smiles) {
      var newContent = `
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
      var newContent = `
        <p>
          ${info}
        </p>`;
    }

    var tipContent = this.updateTipContent(node.tip, newContent);

    if (bestAnnotation.smiles) {
      this.displayMolecule(node);
    }
  },

  displayMolecule: function(node) {

    var viewACS = new ChemDoodle.ViewerCanvas(node.data('id'), 200, 200);
    viewACS.specs.bonds_width_2D = .6;
    viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
    viewACS.specs.bonds_hashSpacing_2D = 2.5;
    viewACS.specs.atoms_font_size_2D = 10;
    viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
    viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
    var moltarget = ChemDoodle.readMOL(node.data('molFile'));
    moltarget.scaleToAverageBondLength(14.4);
    viewACS.loadMolecule(moltarget);
    $('#' + node.tip.popper.id + ' .smiles-display .btn').click( function (event) {
      var target = document.getElementById(`smiles-${node.data('id')}`);
      target.select();
      document.execCommand("copy");
    })
  },

  moleculeElement: function(id, smiles, cosine) {
    var cosineDisplay = '';
    if (cosine > 0) {
      cosineDisplay = `
        <p>
          cosine: ${cosine}
        </p>`;
    }
    return `
      <canvas
        class="ChemDoodleWebComponent"
        id="${id}" width="200" height="200"
        alt="ChemDoodle Web Component"
        style="width: 100px; height: 100px; background-color: rgb(255, 255, 255);">
          This browser does not support HTML5/Canvas.
      </canvas>
      <div class='smiles-display'>
        <input class='value' type="text" value=${smiles} id="smiles-${id}">
        <button type="button" class="btn btn-light btn-sm">Copy</button>
      </div>
      ${cosineDisplay}`;
  },

});
