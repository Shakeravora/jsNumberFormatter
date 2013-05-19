// requires
var assert = require('assert');
var nf = require('../jsnumberformatter.js').nf;

// tests
describe('parseNumberSimple', function() {
    describe('Positive Tests', function() {
        describe('Test1-Parse', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions();
                var number = nf.parseNumberSimple('1.00', options, true);
                assert.equal(number, 1);
            });
        });
        
        describe('Test2-Trim', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', false, true, false);
                var number = nf.parseNumberSimple(' 1.00 ', options, true);
                assert.equal(number, 1);
            });
        });
        
        describe('Test3-RemoveBadCh', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', false, false, true);
                var number = nf.parseNumberSimple('/1k.0l0!', options, true);
                assert.equal(number, 1);
            });
        });
        
        describe('Test4-FullParse', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions();
                var number = nf.parseNumberSimple('-1,000,123.45', options, true);
                assert.equal(number, -1000123.45);
            });
        });
        
        describe('Test5-ParseNegative', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', false, false, false, '^\\(([^\\)]+)\\)$');
                var number = nf.parseNumberSimple('(1,000,123.45)', options, true);
                assert.equal(number, -1000123.45);
            });
        });
    });
    
    describe('Negative Tests', function() {
        describe('Test1-Strict', function() {
            it('Parse to 1', function() {
                try {
                    var options = new nf.parseNumberSimpleOptions().specifyAll(' ', ',', true);
                    var number = nf.parseNumberSimple('1 0 0', options, true);
                    assert.fail('Error expected');
                } catch(err) {
                    assert.equal(err.name, 'Error');
                    assert.equal(err.message, 'Input has more than 1 decimal point: 2');
                }
            });
        });
        
        describe('Test2-ParseNegative', function() {
            it('Parse to 1', function() {
                var options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', false, false, false);
                var number;
                try {
                    number = nf.parseNumberSimple('(1,000,123.45)', options, true);
                    assert.fail();
                } catch(err) {
                    assert.equal(err.name, 'NaNError');
                }
                
                // now try with more strict options
                options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', true, true, false);
                try {
                    number = nf.parseNumberSimple('(1,000,123.45)', options, true);
                    assert.fail();
                } catch(err) {
                    assert.equal(err.name, 'Error');
                }
                
                options = new nf.parseNumberSimpleOptions().specifyAll('.', ',', true, true, true);
                number = nf.parseNumberSimple('(1,000,123.45)', options, true);
                assert.equal(number, 1000123.45);
            });
        });
    });
});
