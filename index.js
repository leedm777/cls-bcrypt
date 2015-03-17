// Copyright (c) 2015. David M. Lee, II
'use strict';

var shimmer = require('shimmer');

var bcrypt = require('bcrypt');

module.exports = function(ns) {
  shimmer.wrap(bcrypt, 'genSalt', function(genSalt) {
    return function(rounds, cb) {
      // rounds is optional
      if (typeof rounds === 'function') {
        rounds = ns.bind(rounds);
      }

      if (typeof cb === 'function') {
        cb = ns.bind(cb);
      }

      return genSalt.call(this, rounds, cb);
    };
  });

  shimmer.wrap(bcrypt, 'hash', function(hash) {
    return function(data, salt, cb) {
      cb = ns.bind(cb);

      return hash.call(this, data, salt, cb);
    };
  });

  shimmer.wrap(bcrypt, 'compare', function(compare) {
    return function(data, hash, cb) {
      cb = ns.bind(cb);

      return compare.call(this, data, hash, cb);
    };
  });
};
