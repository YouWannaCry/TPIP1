import time
import random

def measure(func, runs=1000):
    times = []
    for _ in range(runs):
        start = time.perf_counter_ns()
        func()
        end = time.perf_counter_ns()
        times.append(end - start)
    return min(times), sum(times) // runs, max(times)

# O(n)
arr = [random.randint(0, 100) for _ in range(1_000_000)]
def sum_array():
    total = 0
    for value in arr:
        total += value

min_on, avg_on, max_on = measure(sum_array)
print(f"O(n) - min: {min_on / 1e6:.6f} ms, avg: {avg_on / 1e6:.6f} ms, max: {max_on / 1e6:.6f} ms")

# O(n²)
def has_pair_with_sum():
    array = [random.randint(0, 499) for _ in range(1000)]
    a = random.randint(0, 500)
    b = 1000 - a
    pos1 = random.randint(0, 999)
    pos2 = pos1
    while pos2 == pos1:
        pos2 = random.randint(0, 999)
    array[pos1] = a
    array[pos2] = b

    for i in range(len(array)):
        for j in range(i + 1, len(array)):
            if array[i] + array[j] == 1000:
                return

min_on2, avg_on2, max_on2 = measure(has_pair_with_sum)
print(f"O(n²) - min: {min_on2 / 1e6:.3f} ms, avg: {avg_on2 / 1e6:.3f} ms, max: {max_on2 / 1e6:.3f} ms")

# O(1)
test_set = {random.randint(0, 1_000_000) for _ in range(1_000_000)}
test_value = random.randint(0, 1_000_000)
def is_in_set():
    _ = test_set.__contains__(test_value)

min_o1, avg_o1, max_o1 = measure(is_in_set)
print(f"O(1) - min: {min_o1} ns, avg: {avg_o1} ns, max: {max_o1} ns")
