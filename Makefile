start:
	docker compose up mongo -d
	docker compose up api


start-test:
	docker compose up --build -d mongo-test
	docker compose up --build -d api

stop-test:
	docker compose down -v --remove-orphans mongo-test api


test-e2e: start-test
	docker exec -it reserva-bp sh -c "dockerize -wait tcp://mongo-test:27017 -timeout 15s && dockerize -wait tcp://api:3333 -timeout 15s && npm run test:e2e"
	make stop-test