var fs          = require("fs")
    , assert    = require('assert')
    , url       = require('url')
    , path       = require('path')
    ;


function Section_sorter(mapping)
{
    if ((this instanceof Section_sorter) == false) return new Section_sorter(mapping);

    this.mapping = mapping || false;

    var data = this.loadMapping();
    this.testMappingData(data);

    this.mapping_data = data.mapping;
}

Section_sorter.prototype.loadMapping = function loadMappingFN()
{
    var mapping_data = fs.readFileSync(this.mapping, 'utf8');

    if (mapping_data !== "") {

        return JSON.parse(mapping_data);

    } else {

        throw Error("No mapping data in " + this.mapping);

    }
};

Section_sorter.prototype.testMappingData = function testMappingDataFN(mapping_data)
{
    assert.equal(true, mapping_data.hasOwnProperty("mapping"));
};

Section_sorter.prototype.searchFromUrl = function searchFromUrlFN(entry_url)
{
    var url_data = url.parse(entry_url);
    var path_data = path.dirname(url_data.pathname);

    return this.search(path_data);
};

Section_sorter.prototype.getSectionById = function getSectionByIdFN(section_id)
{
    return this.mapping_data[section_id];
};

Section_sorter.prototype.getMainAndSubSection = function getMainAndSubSectionsFN(section_data)
{
    if (section_data[1].length > 1) {
        //It's a sub section
        return [
            this.getSectionById(section_data[1][0]).section_id,
            section_data[0]
        ]
    } else {
        //It's a main section
        return [
            section_data[0],
            0
        ]
    }
}

Section_sorter.prototype.search = function searchFN(section_name)
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