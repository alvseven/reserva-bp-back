dockerize -wait tcp://mongo:27017 -timeout 15s docker-entrypoint.sh

exec "$@"