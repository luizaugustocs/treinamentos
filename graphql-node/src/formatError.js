// import formatError from 'graphql';

const {formatError} = require('graphql')

export default (error) => {
    const formattedError = formatError(error);
    formattedError.field = error.originalError && error.originalError.field;
    return formattedError;
}