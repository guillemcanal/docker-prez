# CI

#### Gitlab Runner

Utilitaire en cli permettant de faire 
tourner les tests de son projets en local.

```yaml
image: jolicode/php56

before_script:
  - composer install

# démarrer un conteneur mysql
# pour les tests fonctionnels
services:
  - mysql

variables:
  MYSQL_DATABASE: hello_world_test
  MYSQL_ROOT_PASSWORD: mysql

test:mysql:
  script:
    - vendor/bin/phpunit --configuration phpunit_mysql.xml --coverage-text
```