// An error Function to display errors more clearly

export const createError = (status, message) => {
    const err = new Error()
    err.status = status;
    err.message = message;
    return err;
};