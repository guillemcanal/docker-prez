# Partage des images avec les copains

Build

```bash
$ # je build à partir d'un fichier Dockerfile
$ docker build -t monimage:1.0 .
```

Tag

```bash
$ # je tag mon image avec un numéro de version
$ docker tag monimage:1.0 guillem.ninja/monimage:1.0
```

Push

```bash
$ # j'envoie le bouzin sur ma registry privée
$ docker push guillem.ninja/monimage:1.0
```