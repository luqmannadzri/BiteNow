import { ITable } from './table.model'
import { IReservation } from './reservation.model'

export const mockTables: ITable[] = [
    {
        _id: 123,
        numberOfSits: 2,
        location: null,
    },

    {
        _id: 158,
        numberOfSits: 2,
        location: null,
    },

    {
        _id: 546,
        numberOfSits: 2,
        location: null,
    },

    {
        _id: 6598,
        numberOfSits: 5,
        location: null,
    },

    {
        _id: 5147,
        numberOfSits: 4,
        location: null,
    },

    {
        _id: 9588,
        numberOfSits: 5,
        location: null,
    },

    {
        _id: 6555,
        numberOfSits: 5,
        location: null,
    },
]

export const mockReservations: IReservation[] = [
    {
        _tableId: 123,
        date: new Date('2020-03-28T17:30:00Z'),
    },

    {
        _tableId: 9588,
        date: new Date('2020-03-28T17:30:00Z'),
    },

    {
        _tableId: 5147,
        date: new Date('2020-04-01T20:30:00Z'),
    },

    {
        _tableId: 6598,
        date: new Date('2020-05-28T18:30:00Z'),
    },
]
