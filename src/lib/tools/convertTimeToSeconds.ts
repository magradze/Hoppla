export const convertTimeToSeconds = (time: string) => {
    const [hours, minutes] = time.split(':')
    return parseInt(hours) * 3600 + parseInt(minutes) * 60
}