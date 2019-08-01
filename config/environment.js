'use strict';

module.exports = function(environment) {
    let ENV = {
    modulePrefix: 'metwork-frontend',
    version: '0.4.1',
    environment,
    host: 'https://somehost.com',
    rootURL: '/',
    locationType: 'auto',
    guestUser: {
      email: 'metwork.dev@gmail.com',
      password: 'AYL6jGBm6R'
    },
    colors: {
      primary: '#073877',
      secondary: '#636a71',
      success: 'rgb(64,159,64)',
      warning: 'rgb(200,145,17)',
      danger: 'rgb(200,43,17)',
      info: 'rgb(83,139,214)',
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
    };

    // behaviour of Ember Simple Auth:
    // https://www.smallsurething.com/making-ember-and-django-play-nicely-together-a-todo-mvc-walkthrough/
    ENV['ember-simple-auth'] = {
        //authenticationRoute: 'login',
        //baseURL: '/metwork/',
        //routeAfterAuthentication: 'metruns',
        //routeIfAlreadyAuthenticated: 'metruns',
    };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.APP.API_HOST = 'http://127.0.0.1:8000';
    ENV.serverName = 'http://localhost';
    ENV.host = 'http://localhost:8000';
    ENV.APInameSpace = '';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'docker-stage') {
    ENV.serverName = 'http://194.168.0.1';
    ENV.host = 'http://194.168.0.1';
    ENV.APInameSpace = 'metwork-api';
    ENV.rootURL = '/';
  }

  if (environment === 'docker-standalone') {
    ENV.serverName = 'http://localhost';
    ENV.host = 'http://localhost';
    ENV.APInameSpace = 'metwork-api';
    ENV.rootURL = '/';
  }

  if (environment === 'production') {
    ENV.serverName = 'https://metwork.pharmacie.parisdescartes.fr';
    ENV.host = 'https://metwork.pharmacie.parisdescartes.fr';
    ENV.APInameSpace = 'metwork-api';
    ENV.rootURL = '/';
  }

  return ENV;
};
