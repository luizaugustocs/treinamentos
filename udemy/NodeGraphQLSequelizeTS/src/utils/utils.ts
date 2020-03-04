
export const handleError = (error: Error) => {
    const errorMessage = `${error.name}: ${error.message}`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
};

export const JWT_SECRET = process.env.JWT_SECRET;

export const extractToken = (fullToken: string) => {
    const match = fullToken.match(/^Bearer\s(\w+\.\w+\..+)$/);
    if (!match) {
        throw new Error('Unauthorized: invalid token')
    }
    return match[1];
};