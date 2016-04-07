# Docker: Pour nous les devs

Slides de l'atelier d'introduction à Docker.

Consulter la présentation sur Github Pages:  
[guillemcanal.github.io/docker-prez](http://guillemcanal.github.io/docker-prez)

## Dépendances

- [make](http://linux.die.net/man/1/make)
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/)

## Usage

Utiliser `make`

```
Please use `make <target>' where <target> is one of
  dev         run reveal docker container
  bash        exec bash in the reveal container
  kill        kill & remove the container
  info        containers ip address
  grunt       exec grunt task
  pdf         create pdf
  image       create the reveal docker image
  help        show this help
```

## Notes

Le plugin `reveal/plugin/print-pdf` a été modifier pour:

- Wrapper les iframes avec un lien cliquable
- Assurer que toutes les ressources soient chargées (`window.setTimeout` à 5 secondes à défaut de mieux)