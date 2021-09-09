# perf-playground

Repo test and make demos for various performance tests and strategies.

## Prerequisites

1. Git e.g <https://git-scm.com/downloads>
1. Docker Desktop <https://docs.docker.com/desktop/>

## Howto

1. git clone <https://github.com/olapeter/perf-playground.git>
1. docker-compose up --build
1. <http://localhost:7777/>

## Run K6 test

`docker run -i --rm -v /c/arbeid/perf-playground/k6:/k6 loadimpact/k6:latest run /k6/test001.js`

## Challenges / tasks

1. Modify the k6 test to add an assert for response code 200
1. Modify the k6 test to add a threshold for response time
1. Modify the k6 test to log in a user, then access an authenticated endpoint

## Documentation

<https://k6.io/docs/>

## Literature

<https://codefresh.io/containers/docker-anti-patterns/>
<https://docs.docker.com/develop/develop-images/multistage-build/>

### Level up

<https://codefresh.io/kubernetes-tutorial/kubernetes-antipatterns-1/>
