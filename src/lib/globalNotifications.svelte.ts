interface Notification {
    title: string, 
    message: string, 
    type?: "information" | "warning" | "succes",
    duration?: number,
    visible?: boolean
}

const GlobalNotifications = $state({notifications: new Array<Notification>()});

const DispatchSuccesNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title ?? "Succes!",
        message: message,
        duration: duration ?? 5000,
        type: 'succes'
    })
}

const DispatchErrorNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title ?? "Warning!",
        message: message,
        duration: duration ?? 5000,
        type: 'warning'
    })
}

const DispatchInformationNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title ?? "Notice!",
        message: message,
        duration: duration ?? 5000,
        type: 'information'
    })
}

export { GlobalNotifications, DispatchSuccesNotification, DispatchErrorNotification, DispatchInformationNotification }