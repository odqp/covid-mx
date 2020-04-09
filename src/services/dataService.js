import constants from "../utils/consts"
import axios from 'axios';

class dataService {
    constructor() {
        this.constants = new constants();
    }

    async getMexico() {
        var sortedArray = [];        
        await axios.get(this.constants.URL_GET_MEXICO)
        .then(response => {
            let casesArray = response.data.Items;
            sortedArray = casesArray.sort(function (a, b) {
                return a["SortId"] - b["SortId"];
            })       
        })

        return Promise.resolve(sortedArray);
    }
}

export default dataService;


