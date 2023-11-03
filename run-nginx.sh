#!/bin/bash

docker run --name=nginx --rm --network=host \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $(pwd)/index.html:/var/www/index.html:ro \
  nginx
