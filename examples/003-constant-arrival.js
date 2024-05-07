import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'constant-arrival-rate',
            rate: 1,
            duration: '20s',
            preAllocatedVUs: 1,
            maxVUs: 3
        }
    }
};

export default function(){
    http.get(`http://k6-http.grafana.fun/get`)
}