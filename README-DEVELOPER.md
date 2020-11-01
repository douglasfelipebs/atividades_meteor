## Ambiente de Desenvolvimento

Para efetuar alterações no app sem precisar buildar toda vez é necessário instalar o Meteor e o Node caso ainda não possua

### \#1 - Meteor
```
curl https://install.meteor.com/ | sh 
```

### \#2 - Install Node e Npm
```
sudo apt update && sudo apt install curl dirmngr apt-transport-https lsb-release ca-certificates -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update && sudo apt install nodejs gcc g++ make -y
```

### \#3 - Rodar o app.
No diretório do Projeto rodar os comandos a seguir
```
cd app
meteor
```

###\#4 - Acessar
O aplicativo estará disponível em <a href="http://localhost:3000" target="_blank">localhost:3000</a>
