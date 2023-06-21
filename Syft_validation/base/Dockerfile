FROM openjdk:20
COPY . /usr/desktop/sbom
WORKDIR /usr/desktop/sbom
RUN javac -cp .:lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar Main.java
CMD java -cp .:lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar Main
