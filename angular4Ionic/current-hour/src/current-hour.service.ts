
export class CurrentHourService {

    getCurrentDate(callback: (date: Date) => void) {
        callback(new Date());
        setInterval(() => {
            callback(new Date());
        }, 1000)
    }
}