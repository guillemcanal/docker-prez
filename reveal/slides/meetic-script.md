Outil maison en shell chez Meetic

```bash
#!/bin/bash

source ./docker-functions

PROJECT_NAME="php-api-inbox"
BUILD_TARGET=$1

echo_info "starting docker services"
docker_add_service "memcached" "memcached"
docker_add_service "meetic/mysql-base" "mysql"
docker_add_service "meetic/bdd-oracle-xe-11g:v1" "oracle"
docker_add_service "meetic/broker-rh-5" "broker" "oracle:oracle-host"

build_env "SYMFONY_ENV=test"

build_script "echo 'tout va bien se passer :)'"
build_script "phing $BUILD_TARGET"

build_execute "meetic/php53-oracle:latest"

exit $EXIT_CODE
```