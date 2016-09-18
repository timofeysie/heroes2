"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 1, name: 'Myra' },
            { id: 2, name: 'Stingray' },
            { id: 3, name: 'Hakea Blossom' },
            { id: 4, name: 'Bonnie Doon' },
            { id: 5, name: 'Palm Beach Wharf' },
            { id: 6, name: 'Pittwater' },
            { id: 7, name: 'Serrata' },
            { id: 8, name: 'Coasters Retreat' },
            { id: 9, name: 'The Basin' },
            { id: 10, name: 'Lion Island' },
            { id: 11, name: 'Broken Bay' },
            { id: 12, name: 'Refuge Bay' },
            { id: 13, name: 'Hakea seed' },
            { id: 14, name: 'Wallaby' }
        ];
        return { heroes: heroes };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map