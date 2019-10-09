import { jobInterface } from '../../framework/queue/jobInterface';

export class MyJob implements jobInterface {

    data;

    public constructor(data) {
        this.data = data;
    }

    public async handle() {
        console.log('yeah handle this thing');
    }
}