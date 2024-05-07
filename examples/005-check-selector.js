import { check, sleep } from 'k6';
import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 25
        }
    }
};

export default function(){
    sleep(1)
    const expectedNumber = __ITER
    const response = http.get(`http://k6-http.grafana.fun/get?somenumber=${expectedNumber}`)
    const returnedNumber = response.json('args.somenumber')
    check(returnedNumber, {"got expected number": (rn) => rn == expectedNumber})
}