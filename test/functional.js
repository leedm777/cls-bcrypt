// Copyright (c) 2015. David M. Lee, II
'use strict';

var chai = require('chai');
var cls = require('continuation-local-storage');
var bcrypt = require('bcrypt');
var expect = chai.expect;

var ns = cls.createNamespace('test');

// chai config
chai.use(require('dirty-chai'));
chai.config.includeStack = true;

describe('The bcrypt library', function() {
  var rootContext;

  before(function() {
    rootContext = ns.createContext();
  });

  // reset context after each run
  afterEach(function(done) {
    done = ns.bind(done, rootContext);
    done();
  });

  // *** unshimmed tests ***
  describe('when not shimmed', function() {
    describe('.genSalt()', function() {
      describe('with default rounds', function() {
        it('should not maintain context', function(done) {
          ns.run(function() {
            ns.set('context', 'some context');
            bcrypt.genSalt(function() {
              expect(ns.get('context')).to.not.equal('some context');
              done();
            });
          });
        });
      });

      describe('with specified rounds', function() {
        it('should not maintain context', function(done) {
          ns.run(function() {
            ns.set('context', 'some context');
            bcrypt.genSalt(10, function() {
              expect(ns.get('context')).to.not.equal('some context');
              done();
            });
          });
        });
      });
    });

    describe('.hash()', function() {
      var salt;
      beforeEach(function(done) {
        bcrypt.genSalt(function(err, generated) {
          expect(salt).to.not.exist();
          salt = generated;
          done();
        });
      });

      it('should not maintain context', function(done) {
        ns.run(function() {
          ns.set('context', 'some context');
          bcrypt.hash('password', salt, function() {
            expect(ns.get('context')).to.not.equal('some context');
            done();
          });
        });
      });
    });

    describe('.compare()', function() {
      var hash = '$2a$10$B6049f2SpYp6CCC/1s.D0ektIfxc0lh89Tw/E8wxvbpBcFO/eoJua';
      it('should not maintain context', function(done) {
        ns.run(function() {
          ns.set('context', 'some context');
          bcrypt.compare('password', hash, function() {
            expect(ns.get('context')).to.not.equal('some context');
            done();
          });
        });
      });
    });
  });

  // *** shimmed tests ***
  describe('when shimmed', function() {
    before(function loadShim() {
      require('..')(ns);
    });

    describe('.genSalt()', function() {
      describe('with default rounds', function() {
        it('should not maintain context', function(done) {
          ns.run(function() {
            ns.set('context', 'some context');
            bcrypt.genSalt(function() {
              expect(ns.get('context')).to.equal('some context');
              done();
            });
          });
        });
      });

      describe('with specified rounds', function() {
        it('should not maintain context', function(done) {
          ns.run(function() {
            ns.set('context', 'some context');
            bcrypt.genSalt(10, function() {
              expect(ns.get('context')).to.equal('some context');
              done();
            });
          });
        });
      });
    });

    describe('.hash()', function() {
      var salt;
      beforeEach(function(done) {
        bcrypt.genSalt(function(err, generated) {
          expect(salt).to.not.exist();
          salt = generated;
          done();
        });
      });

      it('should not maintain context', function(done) {
        ns.run(function() {
          ns.set('context', 'some context');
          bcrypt.hash('password', salt, function() {
            expect(ns.get('context')).to.equal('some context');
            done();
          });
        });
      });
    });

    describe('.compare()', function() {
      var hash = '$2a$10$B6049f2SpYp6CCC/1s.D0ektIfxc0lh89Tw/E8wxvbpBcFO/eoJua';
      it('should not maintain context', function(done) {
        ns.run(function() {
          ns.set('context', 'some context');
          bcrypt.compare('password', hash, function() {
            expect(ns.get('context')).to.equal('some context');
            done();
          });
        });
      });
    });
  });
});
