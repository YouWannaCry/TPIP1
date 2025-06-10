import java.util.*;

public class Main {
    public static void main(String[] args) {
        int runs = 1000;

        int[] arr = new Random().ints(1_000_000, 0, 100).toArray();
        long[] resultOn = measure(() -> {
            long sum = 0;
            for (int value : arr) {
                sum += value;
            }
        }, runs);
        System.out.printf("O(n) - min: %.6f ms, avg: %.6f ms, max: %.6f ms%n",
                resultOn[0] / 1_000_000.0,
                resultOn[1] / 1_000_000.0,
                resultOn[2] / 1_000_000.0);

        Random rand = new Random();
        long[] resultOn2 = measure(() -> {
            int[] array = rand.ints(1000, 0, 499).toArray();
            int a = rand.nextInt(500);
            int b = 1000 - a;
            int pos1 = rand.nextInt(1000);
            int pos2;
            do {
                pos2 = rand.nextInt(1000);
            } while (pos2 == pos1);
            array[pos1] = a;
            array[pos2] = b;

            boolean found = false;
            for (int i = 0; i < array.length; i++) {
                for (int j = i + 1; j < array.length; j++) {
                    if (array[i] + array[j] == 1000) {
                        found = true;
                        return;
                    }
                }
            }
        }, runs);
        System.out.printf("O(n^2) - min: %.3f ms, avg: %.3f ms, max: %.3f ms%n",
                resultOn2[0] / 1_000_000.0,
                resultOn2[1] / 1_000_000.0,
                resultOn2[2] / 1_000_000.0);

        Set<Integer> set = new HashSet<>();
        for (int i = 0; i < 1_000_000; i++) {
            set.add(rand.nextInt(1_000_000));
        }
        int testValue = rand.nextInt(1_000_000);
        long[] resultO1 = measure(() -> {
            boolean exists = set.contains(testValue);
        }, runs);
        System.out.printf("O(1) - min: %d ns, avg: %d ns, max: %d ns%n",
                resultO1[0], resultO1[1], resultO1[2]);
    }

    public static long[] measure(Runnable task, int runs) {
        long min = Long.MAX_VALUE;
        long max = Long.MIN_VALUE;
        long total = 0;

        for (int i = 0; i < runs; i++) {
            long start = System.nanoTime();
            task.run();
            long time = System.nanoTime() - start;

            if (time < min) min = time;
            if (time > max) max = time;
            total += time;
        }

        return new long[]{min, total / runs, max};
    }
}