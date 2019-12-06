FROM zevrant/zevrant-centos-base:latest

ARG a_version

EXPOSE 4200

RUN mkdir -p /usr/local/microservices/zevrant-home-services/zevrant-home-ui/

RUN mkdir -p /var/log/zevrant-home-services/zevrant-home-ui

RUN adduser -d /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ -G developers -r -U zevrant-home-ui

RUN chown -R zevrant-home-ui:developers /var/log/zevrant-home-services/zevrant-home-ui; chown -R zevrant-home-ui:developers /usr/local/microservices/zevrant-home-services/zevrant-home-ui

COPY ./zevrant-home-ui.tar.gz /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.tar.gz

RUN yum install httpd

USER zevrant-home-ui
#TODO: Add angular project to spring app
RUN cd /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ \
  && tar -xvf /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.tar.gz \
  && mv ./dist/browser/* /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ \
  && rm -r dist

#CMD cd /usr/local/microservices/zevrant-home-services/zevrant-home-ui/; ng serve --prod
