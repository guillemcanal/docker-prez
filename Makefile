PROJECT_NAME = dockerprez

PROJECT_CONTAINERS=docker ps --filter "name=$(PROJECT_NAME)*"

TASK?="--help"

.PHONY: help dev kill info bash grunt log image

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  dev         run reveal docker container"
	@echo "  bash        exec bash in the reveal container"
	@echo "  kill        kill & remove the container"
	@echo "  info        container infos"
	@echo "  grunt       exec grunt task"
	@echo "  pdf         create pdf in ./reveal/build"
	@echo "  image       create the reveal docker image"
	@echo "  help        show this help"

dev:
	@docker-compose -p $(PROJECT_NAME) up -d

bash: dev
	@docker exec -ti $(PROJECT_NAME)_prez_1 bash

info: dev
	@$(PROJECT_CONTAINERS) --format "{{.ID}}" | xargs docker inspect --format="{{.Name}}: {{.NetworkSettings.IPAddress}}"

grunt: dev
	@docker exec -ti $(PROJECT_NAME)_prez_1 grunt $(TASK)

pdf: dev
	@docker exec -ti $(PROJECT_NAME)_prez_1 grunt pdf

log: dev
	@docker-compose -p $(PROJECT_NAME) logs

kill:
	@docker-compose -p $(PROJECT_NAME) kill
	@docker-compose -p $(PROJECT_NAME) rm -f

image:
	@docker build -t gcanal/reveal:3.2.0 .