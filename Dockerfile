FROM node:4.4.1

ENV USER root

COPY reveal/package.json /install/package.json  

RUN npm install -g phantomjs-prebuilt && \
	npm install -g grunt-cli && \
	cd install && \
	npm install

RUN { \
        echo '#!/bin/sh'; \
        echo 'ln -s /install/node_modules /src/node_modules'; \
        echo 'exec grunt -d serve'; \
    } > /run.sh && \
    chmod +x /run.sh	

WORKDIR /src/

CMD /run.sh