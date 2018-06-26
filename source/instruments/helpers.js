export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const delay = (duration = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export const getUniqueID = (length = 15) => {
    if (typeof length !== "number") {
        throw new Error("The function argument should be a number!");
    }

    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getFullApiUrl = (api) => {
    if (typeof api !== "string") {
        throw new Error(
            "'api' argument passed should be a string!"
        );
    }

    return `${api}/`;
};
