import {jobInterface} from '../../framework/queue/jobInterface';

export class myJOb implements jobInterface{

    myObj;

    public constructor(myObj) {

        this.myObj = myObj;
    }

    public handle() {
        console.log('yeah handle this thing');
    }
}