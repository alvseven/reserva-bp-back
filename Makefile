start:
	docker compose up mongo -d
	docker compose up api


start-test:
	docker compose up --build -d mongo-test
	docker compose up --build -d api


stop-test:
	docker compose down -v --remove-orphans mongo-test api


test-e2e: start-test
	docker exec -it reserva-bp npm run test:e2e
	make stop-test