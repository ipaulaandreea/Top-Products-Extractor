import { faker } from '@faker-js/faker';

 export function dummyDataGenerator(){
    const data = [];
    for(let i = 0; i < 10000; i++){
        data.push([
            faker.number.int({min:1, max:3}),
            faker.number.int({min:10, max:100}),
            faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' }),
            faker.number.int({min:1, max:600})
        ])
    }
    return data;
}

