FROM node:8 as meteor

RUN apt-get install -y curl

RUN curl https://install.meteor.com/ | /bin/sh

FROM meteor as app

COPY . .

RUN cd /app && npm install --production

WORKDIR app

EXPOSE 3000

CMD meteor --allow-superuser
