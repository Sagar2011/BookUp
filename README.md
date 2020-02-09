# BookUp

hii

version: '3.1'

services:

  mongodb:
    image: mongo
    #network_mode: host
    restart: on-failure
    volumes:
    - /var/lib/docker/volumes/pocVolume/_data/mongo:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
        - 27017:27017


FROM maven:3.6-jdk-8 AS build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src src
RUN mvn -f pom.xml clean package -DskipTests=true


FROM openjdk:8
#EXPOSE 9000
COPY --from=build /target/customerInformation-0.0.1-SNAPSHOT.jar poc.jar
ENTRYPOINT ["java","-jar","poc.jar"]


################
# ----------------------------#
#        JAVA DEPENDENCY      #
# ----------------------------#
FROM maven:3.6-jdk-8 as webapp_server_maven_cache

RUN mkdir /webappserver

WORKDIR /webappserver

COPY pom.xml /webappserver/

# Expected to download dependencies but not build
# dependencies will be in /root/.m2
RUN mvn dependency:go-offline

# ----------------------------#
#         UI BUILD            #
# ----------------------------#
FROM node:12-alpine as webapp_build

RUN mkdir /webapp

WORKDIR /webapp

COPY angular-security/package.json /webapp/
# Webapp
RUN npm install

COPY ./angular-security /webapp/

RUN ls -ltr /webapp

# build the UI
RUN npm run build

RUN ls -ltr ../

RUN ls -ltr .

RUN ls -ltr /webapp

# ----------------------------#
#        JAVA BUILD           #
# ----------------------------#
FROM maven:3.6-jdk-8 as webapp_server_build

RUN mkdir /webappserver

WORKDIR /webappserver

COPY pom.xml /webappserver/

# Expected to download dependencies but not build
# RUN mvn dependency:go-offline

# Now copy actual source, i.e., this line should be after downloading dependencies to avoid repeated download when src changes
COPY ./src /webappserver/src

RUN rm -rf /webappserver/src/main/resources/static

RUN mkdir -p /webappserver/src/main/resources/static

# Now copy maven dependencies cached from earlier stage
COPY --from=webapp_server_maven_cache /root/.m2 /root/.m2

# Now copy webapp (webclient) distribution for packaging with JAR
COPY --from=webapp_build /webapp/dist/ /webappserver/src/main/resources/static/

# Build now, which should happen quick
RUN mvn clean package -DskipTests=true

# If you choose to test it in a debug mode, this will be the end of Dockerfile
# ENTRYPOINT ["mvn", "spring-boot:run"]

# ----------------------------#
#        JAVA Service         #
# ----------------------------#
FROM maven:3.6-jdk-8

# name this basis the micro service name
RUN mkdir /webappserver

WORKDIR /webappserver
# EXPOSE 8000
# Copy the built service jars and resources
COPY --from=webapp_server_build /webappserver/target /webappserver/target

RUN ls -ltr /webappserver/
# kuratorWebApp-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
