class ApiResponse {



    static sendData(data, message = 'Done') {

        let res = {
            success: true,
            data,
            message
        }

        return res;
    }


    static sendErrors(errors, message = "Errors") {

        let res = {
            success: false,
            errors,
            message
        }

        return res;
    }

}

module.exports = ApiResponse;