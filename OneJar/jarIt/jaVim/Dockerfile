FROM openjdk:11
COPY . /usr/desktop/bomba
WORKDIR /usr/desktop/bomba
#RUN javac -cp .;lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java
# CMD [ "java", "Main" ]
CMD ["java", "-cp", ".;lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java"]