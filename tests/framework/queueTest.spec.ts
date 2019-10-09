import { expect } from 'chai';
import 'mocha';
import { Queue } from "../../framework/queue/queue";
import { MyJob } from "../../application/jobs/myJob";


describe('Queue tests', () => {
    const cacheKey = 'test';
    const cacheValue = 'hello-cache';

    it('cache should xxx', () => {
        return Queue.dispatch((new MyJob({ email: 'test' })))
            .then(() => {
                return Queue.fetchJobs();
            });
    });

});