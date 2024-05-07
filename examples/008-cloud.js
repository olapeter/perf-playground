import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'constant-arrival-rate',
            rate: 1,
            duration: '10s',
            preAllocatedVUs: 1,
            maxVUs: 3
        }
    },
    cloud: {
        distribution: {
          'chef': { loadZone: 'amazon:se:stockholm', percent: 50 },
          'coolbritannia': { loadZone: 'amazon:gb:london', percent: 50 }
        },
    }
};

export default function(){
    http.get(`http://k6-http.grafana.fun/get`)
}