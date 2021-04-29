import * as moment from 'moment'

export default class DateUtils {
    static formatDateToLiteral = (date: Date, format: string): string => {
        let dateToReturn: string = moment(new Date(date))
            .format(format)
            .toString()
        return dateToReturn
    }

    static getStandardTime = (value: string): string => {
        let timeToReturn = value.includes('PM')
            ? parseInt(value.split(':')[0]) +
              12 +
              ':' +
              value.split(':')[1].substring(0, 2)
            : parseInt(value.split(':')[0]) +
              ':' +
              value.split(':')[1].substring(0, 2)

        return timeToReturn
    }
}
