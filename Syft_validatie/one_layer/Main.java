// import org.apache.commons.math4.core.jdkmath.*;
public class Main {
    public static void main(String[] args) {
        // System.out.println("Dependencies work correctly if 1.0 = " + JdkMath.abs(-1.0));
        System.out.println("jar: commons-math4-core              4.0-beta1  java-archive/java-archive \n" +
                "war: commons-math4-legacy            4.0-beta1  web-archive/java-archive\n" +
                "rar: commons-math4-legacy-core       4.0-beta1  roshal-archive/java-archive\n" +
                // "zip: commons-math4-legacy-exception  4.0-beta1  java-archive\n" +
                // "commons-math4-neuralnet         4.0-beta1  java-archive\n" +
                "zip: commons-math4-transform         4.0-beta1  zip-archive/java-archive");
    }
}
//Windows
//java -cp .;lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java
//
//Unix
//java -cp .:lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java
