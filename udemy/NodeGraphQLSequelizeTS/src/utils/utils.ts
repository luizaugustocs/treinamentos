
export const handleError = (error: Error) => {
    const errorMessage = `${error.name}: ${error.message}`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
}