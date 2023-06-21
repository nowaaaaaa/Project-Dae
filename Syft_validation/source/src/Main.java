import org.apache.commons.math4.core.jdkmath.*;
public class Main {
    public static void main(String[] args) {
        System.out.println("Dependencies work correctly if 1.0 = " + JdkMath.abs(-1.0));
        System.out.println("commons-math4-core              4.0-beta1  java-archive\n" +
                "commons-math4-legacy            4.0-beta1  java-archive\n" +
                "commons-math4-legacy-core       4.0-beta1  java-archive\n" +
                "commons-math4-legacy-exception  4.0-beta1  java-archive\n" +
                "commons-math4-neuralnet         4.0-beta1  java-archive\n" +
                "commons-math4-transform         4.0-beta1  java-archive");
    }
}
// Compile and run with:
// Windows:
// java -cp .;lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar;lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java
//
// Unix:
// java -cp .:lib/commons-math-4.0-beta1/commons-math4-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-core-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-legacy-exception-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-neuralnet-4.0-beta1.jar:lib/commons-math-4.0-beta1/commons-math4-transform-4.0-beta1.jar src/Main.java
