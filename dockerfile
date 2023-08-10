FROM mysql:5.7

EXPOSE 3306
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
SHELL ["/bin/bash", "-c"]

RUN sed -i -E 's/(deb|security).debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list \
    && gpg --keyserver keyserver.ubuntu.com --recv 467B942D3A79BD29 && gpg --export --armor 467B942D3A79BD29 | apt-key add - \
    && apt-get update && apt-get install -y curl git-all python3 \
    && rm -rf /var/lib/apt/lists/* \
    && curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash \
    && source /root/.bashrc \
    && nvm install 16 \
    && npm i -g vue

COPY . /home/company

CMD ["sh", "/home/company/mysql/setup.sh"]
