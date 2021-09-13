import http from 'k6/http';

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'constant-arrival-rate',
            rate: 1,
            duration: '1s',
            preAllocatedVUs: 1,
            maxVUs: 3
        }
    }
};

const hostname = "http://host.docker.internal:7777"

export default function () {
    const response = http.get(`${hostname}/delay/150/5`)
}
