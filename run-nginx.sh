#!/bin/bash

docker run --name=nginx --rm --network=host -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx
