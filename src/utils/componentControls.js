export const nestedInputChange = (sub, key, value, stateFunction) => {
    stateFunction(prevDetails => {
        if (prevDetails[sub][key] === value) {
            // If the value hasn't changed, return the previous state to avoid a re-render.
            return prevDetails;
        }
        return {
            ...prevDetails,
            [sub]: { ...prevDetails[sub], [key]: value }
        };
    });
};

export const tabSelector = (tabName, stateFunction) => {
    stateFunction(tabName);
};

export const openLink = (linkUrl) => {
    window.open(linkUrl, "_blank", "nooopen,noreferrer")
}