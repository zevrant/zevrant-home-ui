FROM zevrant/zevrant-centos-base:latest

EXPOSE 8000

RUN mkdir -p /usr/local/microservices/zevrant-home-services/zevrant-home-ui/

RUN mkdir -p /var/log/zevrant-home-services/zevrant-home-ui\
  && mkdir -p /storage/keys

RUN useradd -m -d /usr/local/microservices/zevrant-home-services/zevrant-home-ui/ -G developers  zevrant-home-ui

RUN chown -R zevrant-home-ui:developers /var/log/zevrant-home-services/zevrant-home-ui /usr/local/microservices/zevrant-home-services/zevrant-home-ui /storage/keys

USER zevrant-home-ui

COPY build/libs/zevrant-home-ui-*.jar /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar

RUN mkdir -p ~/.aws; echo "[default]" > ~/.aws/credentials; echo "[default]" > ~/.aws.config; echo "region = us-east-1" >> ~/.aws/config; echo "output = json" >> ~/.aws/config;

CMD echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> ~/.aws/credentials\
 && echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials\
 && IFS='\ '\
 && IP=$(hostname -I)\
 && read -ra arr <<< "$IP"\
 && echo ${arr[2]}\
 && export IP_ADDRESS=${arr[2]}\
 && echo $IP_ADDRESS \
 && java -jar -Dspring.profiles.active=prod -Deureka.instance.hostname=$IP_ADDRESS /usr/local/microservices/zevrant-home-services/zevrant-home-ui/zevrant-home-ui.jar
