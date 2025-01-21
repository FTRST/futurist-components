export const openWindow = (manipulateWindows, windowData) => {
    console.log(windowData)
    manipulateWindows({
        type: 'add',
        window: windowData
    });
};

export const closeWindow = (manipulateWindows, id) => {

    manipulateWindows({
        type: 'remove',
        window: { id:id }
    });
};

export const bringToFront = (manipulateWindows, id) => {

    manipulateWindows({
        type: 'reindex',
        window: { id: id }
    });
};

export const resizeWindow = (manipulateWindows, id, newSize) => {

    manipulateWindows({
        type: 'update',
        window: { id: id, props: newSize }
    });
};


