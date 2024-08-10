FROM openjdk:17-jdk-alpine
RUN addgroup -S dev && adduser -S springuser -G dev
USER springuser:dev
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
