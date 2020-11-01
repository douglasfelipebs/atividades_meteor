# Desafio (App Projetos com Meteor)

### Porque Meteor?

Meteor é um framework JavaScript que auxilia na criação de <i>Single Page Aplications</i> (SPA)
utilizando a estrutura Cliente-Servidor, além de possuir o MongoDB integrado para Banco de Dados.

### Como executar (Buildado)?
#### \#1 - Instale o docker em seu computador.
``` 
curl -fsSL get.docker.com | sh
sudo usermod -aG docker $USER 
```
Ou siga as instruções no link -> <a href="https://docs.docker.com/engine/install/" target="_blank">Install Docker</a>

\
#### \#2 - Instale o docker-compose em seu computador.
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Ou siga as instruções no link -> <a href="https://docs.docker.com/compose/install/" target="_blank">Install Docker Compose</a>

\
#### \#3 - Suba o contâiner que contém o meteor e o programa buildado
```
docker-compose up -d
```

\
#### \#4 - Acesse o app no <a href="http://localhost" target="_blank">localhost</a>

Para efetuar alterações no aplicavo é necessária a instalação do Meteor.
\
Siga as informações no [README-DEVELOPER.md](https://github.com/douglasfelipebs/atividades_meteor/blob/main/README-DEVELOPER.md)  
