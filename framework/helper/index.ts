export default class Helper {
    public static createError(type: string, message: string) {
        const error: any = new Error(message);

        if (!message && type) {
            message = type;
            type = '';
        }

        switch (type) {
            case 'UNAUTHORIZED':
                error.name = 'UnauthorizedError';
                error.status = 401;
                error.message = error.message || 'Authentication required';

                break;

            case 'BAD_REQUEST':
                error.name = 'BadRequest';
                error.status = 400;
                error.message = error.message || 'Invalid request';

                break;

            case 'BAD_PERMISSION':
                error.name = 'BadPermission';
                error.status = 403;
                error.message = error.message || 'Permission Denied';

                break;

            default:
                error.name = 'InternalServerError';
                error.status = 500;
                error.message = error.message || 'An error occurred';

                break;
        }

        return error;
    }

    public static formatResponse(result: any, headers?: any) {
        let response: any, errorObj: any;

        const DEFAULT_HEADERS = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json',
        };

        if (result.status || result.statusCode) {
            // error
            errorObj = {
                ...result,
                message: result.message,
            };
            response = {
                statusCode: result.status || result.statusCode,
                body: JSON.stringify(errorObj),
            };
        } else if (result.code && result.code !== 200) {
            const data = result.response || {};
            const errors =
                data.body && data.body.errors ? data.body.errors : [];
            const errorMessage = errors.length > 0 ? errors[0].message : '';

            errorObj = {
                ...data,
                message: errorMessage,
            };
            response = {
                statusCode: result.code,
                body: JSON.stringify(errorObj),
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }

        response.headers = DEFAULT_HEADERS;
        response.isBase64Encoded = false;

        if (headers) {
            response.headers = Object.assign(response.headers, headers);
        }

        return response;
    }

    public static guid() {
        const s4 = () =>
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);

        return (
            s4() +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            s4() +
            s4()
        );
    }
}
