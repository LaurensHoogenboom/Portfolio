const toFullDataTimeString = (value: Date) => {
    return value.toLocaleString("nl-NL", { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'});
}

export { toFullDataTimeString }