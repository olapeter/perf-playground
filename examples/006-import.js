import http from 'k6/http'
import { isOdd } from './isodd.js';

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1
        }
    }
};

export default function(){
    const response = http.get(`http://k6-http.grafana.fun/get?foo=1`)
    console.log(isOdd(response.json('args.foo')))

}