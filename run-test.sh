#!/bin/sh

echo "Testing node.js server directly (10 seconds)..."
siege http://localhost:9000 -t 10s
echo "Testing node.js server through nginx reverse proxy (10 seconds)..."
siege http://localhost:9001 -t 10s
