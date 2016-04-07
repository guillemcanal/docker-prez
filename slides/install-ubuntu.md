# Installation 

## Ubuntu (14.04 LTS)

...ou [#RTFM](https://docs.docker.com/engine/installation/linux/ubuntulinux/)

```bash
$ echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" \
| sudo tee -a /etc/apt/sources.list
$ apt-get update
$ apt-get install \
    apt-transport-https \
    ca-certificates \
    linux-image-extra-$(uname -r) \
    apparmor \
    docker-engine
$ sudo usermod -aG docker $(id -un)
```

Quitter la session puis revenir