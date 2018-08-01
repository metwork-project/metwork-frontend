import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) { return key; },
  keyForRelationship(key) { return key; },


//https://emberigniter.com/pagination-in-ember-with-json-api-backend/

  normalizeQueryResponse(store, clazz, payload) {
    const result = this._super(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload);
    }

    return result;
  },


  createPageMeta(data) {

    let meta = {};

    Object.keys(data.links).forEach(type => {
      const link = data.links[type];
      meta[type] = {};
      let a = document.createElement('a');
      a.href = link;

      a.search.slice(1).split('&').forEach(pairs => {
        const [param, value] = pairs.split('=');

        if (param == 'page') {
          meta[type].page = parseInt(value);
        }
        if (param == 'page%5Bnumber%5D') {
          meta[type].number = parseInt(value);
        }
        if (param == 'page%5Bsize%5D') {
          meta[type].size = parseInt(value);
        }

      });
      a = null;
    });
    
    meta.current = data.meta.pagination.page;        

    return meta;

  },

});
