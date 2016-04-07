# Installation

## Pour Windows et Mac

Installer la [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

```bash
# choisir le nom de sa VM
$ NOM_MACHINE=""
# créer la machine
$ docker-machine create -d virtualbox \
--virtualbox-cpu-count "4" \
--virtualbox-disk-size "50000" \
--virtualbox-hostonly-nictype "Am79C973" \
--virtualbox-memory "4096" \
--virtualbox-no-share $NOM_MACHINE
# créer un partage NFS avec l'hote
# @see: https://github.com/adlogix/docker-machine-nfs
$ docker-machine-nfs meetic \
--mount-opts="noacl,async,actimeo=1" --force
```