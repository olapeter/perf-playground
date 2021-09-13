#!/bin/sh
if [ -z $1 ]; 
then
    echo "Usage: $0 001"
    exit 1
else
    docker run -i --rm -v $PWD/k6:/k6 loadimpact/k6:latest run /k6/test$1.js >stdout.log 2>stderr.log
fi