import { faker } from '@faker-js/faker';
import { connection } from './db.js';

export function dummyDataGenerator() {
    const data = [];

    for (let i = 0; i < 10000; i++) {
        const type = faker.number.int({ min: 1, max: 3 });
        const value = faker.number.int({ min: 20, max: 100 });
        const time = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' }).toISOString().slice(0, 19).replace('T', ' ');
        const prod = faker.number.int({ min: 1, max: 150 });

        data.push([type, value, time, prod]);
    }

    const sql = 'INSERT INTO actions (type, value, time, prod) VALUES ?';

    connection.query(sql, [data], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Data generated and inserted successfully');
        }
    });
}
