import locations from '../public/locations.json';

function inputLocationMatch(searchWords, loc) {
    let strippedAdminName = loc['admin_name'].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const tester =
        [loc["city"], loc["city_ascii"], loc["country"], loc["iso2"], loc["iso3"], loc["admin_name"], strippedAdminName].join(",");
    let word;
    if (searchWords.join().length === 0) {
        return false;
    }
    for (word of searchWords) {
        let strippedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!(tester.includes(word) || tester.includes(strippedWord))) {
            return false;
        }
    }
    return true;
}

self.onmessage = (e) => {
    let suggestions = [];
    let searchWords = e.data;
    let loc;
        for (loc of locations) {
            if (inputLocationMatch(searchWords, loc)) {
                suggestions.push(loc);
            }
            if (suggestions.length === 5) {
                break;
            }
        }
    self.postMessage(suggestions);
}
