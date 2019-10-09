import { jobInterface } from '../../framework/queue/jobInterface';

export class MyJob implements jobInterface{

    data;

    public constructor(data) {
        this.data = data;
    }

    public async handle() {
        throw new Error('Fake error mocking...')
        // console.log('yeah handle this thing');
    }
}