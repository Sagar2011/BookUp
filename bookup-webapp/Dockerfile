# ----------------------------#
#        JAVA DEPENDENCY      #
# ----------------------------#
FROM maven:3.6-jdk-8 as webapp_server_maven_cache

RUN mkdir /webappserver

WORKDIR /webappserver

COPY pom.xml /webappserver/

# Expected to download dependencies but not build
# dependencies will be in /root/.m2
ENV MVN_LOCAL_REPO=/maven/home
RUN mvn -Dmaven.repo.local=$MVN_LOCAL_REPO dependency:go-offline

# ----------------------------#
#         UI BUILD            #
# ----------------------------#
FROM node:12-alpine as webapp_build

RUN mkdir /webapp

WORKDIR /webapp

COPY WebApp/package.json /webapp/

RUN npm install

COPY ./WebApp /webapp/

RUN ls -la /webapp

RUN npm run build -- --prod

RUN ls -la /webapp

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
COPY --from=webapp_server_maven_cache /maven/home /maven/home

# Now copy webapp (webclient) distribution for packaging with JAR
COPY --from=webapp_build /webapp/dist/ /webappserver/src/main/resources/static/

# Build now, which should happen quick
RUN mvn -Dmaven.repo.local=$MVN_LOCAL_REPO clean package -DskipTests=true

# If you choose to test it in a debug mode, this will be the end of Dockerfile
# ENTRYPOINT ["mvn", "spring-boot:run"]

# ----------------------------#
#        JAVA Service         #
# ----------------------------#
FROM maven:3.6-jdk-8

# name this basis the micro service name
RUN mkdir /webappserver

WORKDIR /webappserver

# Copy the built service jars and resources
COPY --from=webapp_server_build /webappserver/target /webappserver/target

RUN ls -ltr /webappserver/

ENTRYPOINT ["java", "-jar", "target/WebAppMicroservice.jar"]