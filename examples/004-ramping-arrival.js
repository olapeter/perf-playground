import { sleep } from 'k6';
import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'ramping-arrival-rate', //eller constant-vus
            preAllocatedVUs: 5,
            maxVUs: 15,
            stages: [
                { duration: '5s', target: 5 },
                { duration: '5s', target: 5 },
                { duration: '5s', target: 0 }
            ]
        }
    }
};

export default function(){
    sleep(1) //bare for demo
    http.get(`http://k6-http.grafana.fun/get`)
}