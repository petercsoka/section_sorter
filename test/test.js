var test_mapping = __dirname + "/test_mapping.json";

var assert = require("assert")
    , sorter = require("../section_sorter")(test_mapping)
;

describe('Testing section sorter', function(){

    describe("Value is parent1", function() {

        var data = [];

        beforeEach(function(){
            data = sorter.search("parent1");
        });

        it('should return an array', function(){
            assert.equal("object", typeof data);
        });

        it('should be a 2 lengths array', function(){
            assert.equal(2, data.length);
        });

        it("should contains 1 in the first element of the returned array", function(){
            assert.equal(1, data[0]);
        });

        it("should contains [1] in the secound element of the returned array", function(){
            assert.equal("object", typeof data[1]);
            assert.equal(1, data[1][0]);
        });

    });

    describe("Value is child1 (first level child)", function() {

        var data = [];

        beforeEach(function(){
            data = sorter.search("child1");
        });

        it('should return an array', function(){
            assert.equal("object", typeof data);
        });

        it('should be a 2 lengths array', function(){
            assert.equal(2, data.length);
        });

        it("should contains 1 in the first element of the returned array", function(){
            assert.equal(1, data[0]);
        });

        it("should contains [1] in the secound element of the returned array", function(){
            assert.equal("object", typeof data[1]);
            assert.deepEqual([2,3], data[1]);
        });

    });

    describe("Value is child1-1 (second level child)", function() {

        var data = [];

        beforeEach(function(){
            data = sorter.search("child1-1");
        });

        it('should return an array', function(){
            assert.equal("object", typeof data);
        });

        it('should be a 2 lengths array', function(){
            assert.equal(2, data.length);
        });

        it("should contains 2 in the first element of the returned array", function(){
            assert.equal(2, data[0]);
        });

        it("should contains [1] in the secound element of the returned array", function(){
            assert.equal("object", typeof data[1]);
            assert.deepEqual([2,3, 4], data[1]);
        });

    });

})

