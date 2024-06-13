start:
	docker compose up mongo -d
	docker compose up --build api


start-test:
	docker compose up --build -d mongo-test
	docker compose up --build -d api


stop-test:
	docker compose rm -fsv mongo-test
	docker stop reserva-bp


test-e2e: start-test
	docker exec -it reserva-bp sh -c "dockerize -wait tcp://mongo-test:27017 -timeout 15s && dockerize -wait tcp://api:3333 -timeout 15s && npm run test:e2e" || true
	make stop-test