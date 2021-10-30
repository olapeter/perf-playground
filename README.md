# perf-playground

Repo test and make demos for various performance tests and strategies.

## Prerequisites

1. Docker Desktop <https://docs.docker.com/desktop/>

## How to get started

1. Go to a terminal window (Windows Terminal etc.)
1. git clone <https://github.com/olapeter/perf-playground.git>
1. `cd perf-playground`
1. `docker-compose up --build` (build argument only required when something has changed)
1. Visit <http://127.0.0.1:7777/>

## Container workshop

### Initial state

Page at <http://127.0.0.1:7777/> should show some red error. The objective of the workshop is to make it green.

To do that we need to containerize our storage module

### Challenges / tasks container workshop

1. Locate docker-compose.yml and uncomment the commented lines (hint: type `code .` in the terminal on Windows/Linux. On Mac start VSCode or similar the usual way)
1. `docker-compose up --build` -> This fails
    - try to understand what is missing
1. As a group, try to formulate what docker-compose.yml describes. Bonus point if you can do it one word.
1. Be inspired by Dockerfile.server and try to make it work for the storage component
    - Repeat `docker-compose up --build` until it works
1. Uncomment lines 15 and 16 in Dockerfile.storage (following "# unit tests")
1. `docker-compose up --build` - Oh noes, fails again.
    - Fix it.
    - Page at <http://127.0.0.1:7777/> should now be green
1. Open "Docker desktop" and stop any of the "perf-playground_*" services
    - Observe what happens at <http://127.0.0.1:7777/>

## k6 workshop

### Run k6 test

Switch to a new terminal window and cd into perf-playground

`chmod +x runtestk6.sh` (first time only)

`./runtestk6.sh 001`

### Challenges / tasks load test workshop

1. Locate the logs and look at the output (hint: type `code .` in the terminal on Windows/Linux. On Mac start VSCode or similar the usual way)
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
