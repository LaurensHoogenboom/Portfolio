interface Notification {
    title?: string, 
    message: string, 
    type?: "information" | "warning" | "succes",
    duration?: number,
    visible?: boolean
}

const GlobalNotifications = $state({notifications: new Array<Notification>()});

const DispatchSuccesNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'succes'
    })
}

const DispatchWarningNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'warning'
    })
}

const DispatchInformationNotification = (message: string, title?: string, duration?: number) => {
    GlobalNotifications.notifications.push({
        title: title,
        message: message,
        duration: duration ?? 5000,
        type: 'information'
    })
}

export { GlobalNotifications, DispatchSuccesNotification, DispatchWarningNotification, DispatchInformationNotification }