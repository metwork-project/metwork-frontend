import Controller from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({




  actions: {
    fragCompareConfSave() {
      let params = {}
      $('.frag-compare-conf-field > input').each(function ( /*index*/) {
        params[$(this).attr('name')] = $(this).val();
      })
      this.model.updateFragCompareConf(params);
    },
    DeleteCustomFragFile: function (fileFormat) {
      this.model.DeleteCustomFragFile({ file_format: fileFormat }).then(this.model.reload())
    },
  },

  getFragCompareConf: function () {
    let fragCompareConfId = this.get('model.frag_compare_conf_id');
    if (fragCompareConfId) {
      this.set('fragCompareConf', this.get('store').findRecord(
        'frag_compare_conf', fragCompareConfId, { reload: true }));
    }
  },

  CustomFragFileTypesDescription: computed('model.CustomFragFileTypes', function () {
    let decriptionDic = this.model.get("CustomFragFileTypes").reduce(function (typeDic, typeRow) {
      typeDic[typeRow.label] = typeRow.description
      return typeDic
    }, {})
    return decriptionDic
  }),

  canUploadFileTypes: computed('model.list_custom_frag_param_files', function () {
    let custom_files = this.model.get('list_custom_frag_param_files')
    return Object.keys(custom_files).length < 2 && this.model.get("editable")
  }),

  compareConfFields: computed('fragCompareConf', function () {
    return {
      filter: [
        {
          label: 'Minimum intensity threshold',
          step: '1',
          fieldName: 'filter_min_intensity'
        },
        {
          label: 'filter_parent_filter_tolerance',
          step: '1',
          fieldName: 'filter_parent_filter_tolerance'
        },
        {
          label: 'filter_matched_peaks_window',
          step: '1',
          fieldName: 'filter_matched_peaks_window'
        },
        {
          label: 'filter_min_matched_peaks_search',
          step: '1',
          fieldName: 'filter_min_matched_peaks_search'
        },
      ],
      cosine: [
        {
          label: 'cosine_mz_tolerance',
          step: '0.01',
          fieldName: 'cosine_mz_tolerance'
        },
        {
          label: 'cosine_min_matched_peaks',
          step: '1',
          fieldName: 'cosine_min_matched_peaks'
        },
        {
          label: 'cosine_threshold',
          step: '0.01',
          fieldName: 'cosine_threshold'
        },
      ]
    }
  }),

});
