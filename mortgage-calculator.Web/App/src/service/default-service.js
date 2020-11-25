import Axios from "axios";
import Promise from "promise";

const defaultsService = {
    getDefaults: function () {
        return new Promise((resolve, reject) => {
            Axios.get("/GetDefaults")
                .then(e => resolve(e.data));
        });
    }
}

export default defaultsService;