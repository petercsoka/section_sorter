var fs          = require("fs")
    , assert    = require('assert')
;


function Section_sorter(mapping)
{
    if ((this instanceof Section_sorter) == false) return new Section_sorter(mapping);

    this.mapping = mapping || false;
    var sorter_self = this;

    this.loadMapping(function(err, mapping_data) {
        sorter_self.testMappingData(mapping_data);
        sorter_self.mapping_data = mapping_data.mapping;

        sorter_self.getSection("asd");
    });
}

Section_sorter.prototype.loadMapping = function loadMappingFN(callback)
{
    fs.readFile(this.mapping, 'utf8', function(err, mapping_data) {
        if(err) callback(err);

        if (mapping_data !== "") {
            callback(null, JSON.parse(mapping_data));
        } else {
            callback("No mapping data in " + this.mapping);
        }
    });
};

Section_sorter.prototype.testMappingData = function testMappingDataFN(mapping_data)
{
    assert.equal(true, mapping_data.hasOwnProperty("mapping"));
};

Section_sorter.prototype.search = function searchFN(section_name, callback)
{
    var self = this;
    var looper = function(data, section_name){
        for(i = 1; i <= Object.keys(data).length; i++) {

            if (data[i].name == section_name) {
                var path = [i];
                if(typeof data[i].parent !== "undefined") {
                    var hasParent = true;
                    var parent = data[i].parent;
                    while(hasParent) {

                        var new_data = self.mapping_data[parent];
                        path.unshift(parent);

                        if (typeof new_data.parent !== "undefined") {
                            parent = new_data.parent;
                        } else {
                            hasParent = false;
                        }

                    }
                }

                return [data[i].section_id,path];

            }

        }
    };

    return looper(this.mapping_data, section_name);

};

module.exports = Section_sorter;