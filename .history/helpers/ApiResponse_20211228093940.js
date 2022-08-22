class ApiResponse {



    static sendData(data, message) {

        let res = {
            success: true,
            data,
            message
        }

        return res;
    }


    static sendErrors(errors, message) {

        let res = {
            success: false,
            errors,
            message
        }

        return res;
    }

}

module.exports = ApiResponse;