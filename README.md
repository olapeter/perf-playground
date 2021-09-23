# perf-playground

Repo test and make demos for various performance tests and strategies.

## Prerequisites

1. Docker Desktop <https://docs.docker.com/desktop/>

## Howto

1. git clone <https://github.com/olapeter/perf-playground.git>
1. `cd perf-playground`
1. `docker-compose up --build` (build argument only required when something has changed)
1. Visit <http://localhost:7777/>

## Run k6 test

Switch to a new terminal window and cd into perf-playground

`chmod +x runtest.sh` (first time only)

`./runtest.sh 001`

## Challenges / tasks

1. Locate the logs and look at the output (hint: type `code .` in the terminal)
1. Find out how to log the HTTP headers of the k6 requests in the test
1. Modify the k6 test to add a check for response code 200
1. Modify the k6 test to run a total of 50 requests in 10 seconds
1. Modify the k6 test to add a threshold for response time
1. Modify the k6 test to log in a user in a setup function, then access an authenticated endpoint in the main test

## Documentation

<https://k6.io/docs/>

## Literature

<https://en.wikipedia.org/wiki/Mob_programming>
<https://codefresh.io/containers/docker-anti-patterns/>
<https://docs.docker.com/develop/develop-images/multistage-build/>

### Level up

<https://codefresh.io/kubernetes-tutorial/kubernetes-antipatterns-1/>
