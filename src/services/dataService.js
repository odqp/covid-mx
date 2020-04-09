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

    async getAge() {
        var sortedArray = [];
        await axios.get(this.constants.URL_GET_AGE)
            .then(response => {
                let tempdata = response.data.Items;                

                sortedArray = tempdata.sort(function (a, b) {
                    return a["Id"] - b["Id"];
                });                
            })

        return Promise.resolve(sortedArray);
    }

    async getStates() {
        var arrayProcessed = [];
        var confiStates = this.constants.STATES_CONFIG;
        await axios.get(this.constants.URL_GET_STATES)
            .then(response => {
                let finaldata = response.data.Items[0].Data;
                finaldata = finaldata.replace("[[", "");
                finaldata = finaldata.replace("]]", "");

                let dataArray = finaldata.split("],[");                

                var counter = 0;
                dataArray.forEach(function (item) {
                    let estado = item.replace(/\"/g, "").split(",");

                    arrayProcessed.push([parseInt(estado[0]), confiStates[counter][2], parseInt(estado[4]), parseInt(estado[5]), parseInt(estado[6]), parseInt(estado[7]), confiStates[counter][0]]);
                    counter++;
                });
            })

        return Promise.resolve(arrayProcessed);
    }
}

export default dataService;


