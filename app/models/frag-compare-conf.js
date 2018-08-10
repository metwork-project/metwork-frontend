import DS from 'ember-data';

export default DS.Model.extend({

	filter_min_intensity: DS.attr('number'),
  filter_parent_filter_tolerance: DS.attr('number'),
  filter_matched_peaks_window: DS.attr('number'),
  filter_min_matched_peaks_search: DS.attr('number'),
  cosine_mz_tolerance: DS.attr('number'),
  cosine_min_matched_peaks: DS.attr('number'),
  cosine_threshold: DS.attr('number'),

});
