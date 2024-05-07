import { sleep } from 'k6';
import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'shared-iterations', //eller per-vu-iterations
            iterations: 40,
            vus: 2,
            maxDuration: '20s'
        }
    }
};

export default function(){
    sleep(1) //bare for demo
    http.get(`http://k6-http.grafana.fun/get`)
}