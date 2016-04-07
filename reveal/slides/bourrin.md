# Pour nous les bourrins

Supprimer les conteneurs qui ne tourne pas

```bash
# docker remove containers (docker list containers id where status is exited)
docker rm $(docker ps -q -f status=exited)
```
Oblitérer tous les conteneurs qu'ils tournent ou non

```bash
# docker remove containers force (docker list all containers ID)
docker rm -f $(docker ps -aq)
```

Supprimer les images qui ne sont pas tagguées

```bash
# docker remove image (docker list untagged images ID)
docker rmi $(docker images -f "dangling=true" -q)
```