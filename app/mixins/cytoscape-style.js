import Mixin from '@ember/object/mixin';
import ENV from '../config/environment'

export default Mixin.create({

  cyStyle: function (graphStyle) {

    let colors = ENV.colors;

    let statusDict = {
      'undefined': 0,
      'explored': 10,
      'putative': 20,
      'validated': 30,
    }

    let styleSheet = cytoscape.stylesheet()
      .selector('node')
      .css({
        'background-color': '#666',
        'border-color': '#666',
        'label': 'data(name)',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-color': '#666',
        'text-outline-width': '2px',
        'color': '#fff',
        'border-width': '4px',
      })
      .selector('node[nodeType = "reaction"]')
      .css({
        'shape': 'roundrectangle',
        'width': '60px',
        'background-color': colors.primary,
        'text-outline-color': colors.primary,
        'border-color': colors.primary,
        'text-wrap': 'ellipsis',
        'text-max-width': '90px',
      })
      .selector('node[nodeType = "molecule"]')
      .css({
        'shape': 'ellipse',
      })
      .selector('node[nodeType = "molecule"][isSeed]')
      .css({
        // 'shape': 'round-diamond',
        'shape': 'triangle',
      })
      .selector(`node[nodeType = "molecule"][annotationStatusId = ${statusDict["validated"]}],
                node[nodeType = "ion"][annotationStatusId = ${statusDict["validated"]}]`)
      .css({
        'background-color': colors.success,
        'text-outline-color': colors.success,
        'border-color': colors.success,
      })
      .selector(`node[nodeType = "molecule"][annotationStatusId = ${statusDict["putative"]}],
                node[nodeType = "ion"][annotationStatusId = ${statusDict["putative"]}]`)
      .css({
        'background-color': colors.warning,
        'text-outline-color': colors.warning,
        'border-color': colors.warning,
      })
      .selector(`node[nodeType = "molecule"][annotationType = "public"],
        node[nodeType = "ion"][annotationType = "public"]`)
      .css({
        'background-color': colors.info,
        'text-outline-color': colors.info,
      })
      .selector('.node-select')
      .css({
        'background-color': '#FFD700',
      })
      .selector('.node-filter')
      .css({
        'border-width': '4px',
        'border-color': colors.danger,
      })
      .selector('.highlight')
      .css({
        'line-color': colors.info,
        'background-color': colors.info,
        'target-arrow-color': colors.info,
        'text-outline-color': colors.info,
      })
      .selector('.downlight')
      .css({
        'opacity': 0.2,
      })


    switch (graphStyle) {
      case 'metabolization':
        styleSheet.selector('edge')
          .css({
            'curve-style': 'bezier',
            'width': 6,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.5,
          })
        break;
      default:
        styleSheet.selector('edge')
          .css({
            'curve-style': 'bezier',
            'width': 4,
            'line-color': '#ccc',
          })
        break;
    }

    return styleSheet;
  },
});
