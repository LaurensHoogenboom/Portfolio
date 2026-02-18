import { getRandomId } from "$lib/utils/generateRandomId";

interface Notification {
    id: string,
    title?: string,
    message: string,
    type?: "information" | "warning" | "succes",
    duration?: number,
    visible?: boolean
}

const globalNotifications = $state({ notifications: new Array<Notification>() });

const formActionTypeStringMap = { create: 'create', update: 'update', delete: 'delete' };
type FormActionType = keyof typeof formActionTypeStringMap;

const isFormActionType = (value: string): value is FormActionType => {
    return value in formActionTypeStringMap
}

const notifyFormActionSuccess = (action: FormActionType, itemName: string) => {
    switch (action) {
        case 'create':
            dispatchSuccesNotification(`"${itemName}" was succesfully added.`);
            break;
        case 'update':
            dispatchSuccesNotification(`Changes to "${itemName}" were succesfully saved.`);
            break;
        case 'delete':
            dispatchSuccesNotification(`"${itemName}" was succesfully removed.`);
            break;
        default:
            break;
    }
}

const dispatchSuccesNotification = (message: string, title?: string, duration?: number) => {
    globalNotifications.notifications.push({
        id: getRandomId(),
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'succes'
    })
}

const dispatchWarningNotification = (message: string, title?: string, duration?: number) => {
    globalNotifications.notifications.push({
        id: getRandomId(),
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'warning'
    })
}

const dispatchInformationNotification = (message: string, title?: string, duration?: number) => {
    globalNotifications.notifications.push({
        id: getRandomId(),
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'information'
    })
}

export { globalNotifications, dispatchSuccesNotification, dispatchWarningNotification, dispatchInformationNotification, notifyFormActionSuccess, isFormActionType }