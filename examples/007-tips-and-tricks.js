import http from 'k6/http'

export let options = {
    summaryTrendStats: ['avg', 'med', 'min', 'max', 'p(95)', 'p(99)'],
    scenarios: {
        open_model: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1
        }
    },
    //discardResponseBodies: true, //øker ytelsen på k6, bør settes for store tester
    //httpDebug: 'full', //kjekk for å debugge
    noConnectionReuse: true, //slår av keep-alive på connections globalt - bruk med omhu
    noVUConnectionReuse: true, //slår av keep-alive på connections per tråd
};

export default function(){
    const response = http.get(`http://k6-http.grafana.fun/get?foo=bar`)
    console.log(response.json('args.foo'))

}

// K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_PERIOD=1s k6 run