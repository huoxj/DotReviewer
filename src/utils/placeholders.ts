import type {ReviewReply} from "@/utils/types";

export const PH_code = "#include <stdio.h>\n\nint main() {\n  printf(\"Hello, World!\");\n  return 0;\n}";

export const PH_reply : ReviewReply[] = [
  {
    id: 0,
    problemIcon: "mdi-repeat-off",
    problemTitle: "Inefficient Recursive Approach",
    problemDesc: "The current implementation of the Fibonacci function uses a recursive approach, which is not efficient for large inputs due to the repeated computation of the same sub-problems. This can be improved using dynamic programming techniques.",
    lineBegin: 1,
    lineEnd: 4,
    language: "c",
    fixedCode: "int fib(int n) {\n  int dp[n+1];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}"
  },
  {
    id: 1,
    problemIcon: "mdi-head-check-outline",
    problemTitle: "Lack of Input Validation",
    problemDesc: "The function does not validate its input. It assumes that the input will always be a non-negative integer. However, it does not handle cases where the input is a negative integer or a non-integer value. This could lead to incorrect results or crashes.",
    lineBegin: 1,
    lineEnd: 1,
    language: "c",
    fixedCode: "int fib(int n) {\n  if (n < 0) {\n    // Handle negative input, e.g., throw an exception\n    throw std::invalid_argument(\"Input must be a non-negative integer.\");\n  }\n  // ... rest of the function\n}"
  },
  {
    id: 2,
    problemIcon: "mdi-stack-overflow",
    problemTitle: "Potential Integer Overflow",
    problemDesc: "For large inputs, the function may cause an integer overflow when calculating the Fibonacci number. This could result in incorrect results.",
    lineBegin: 1,
    lineEnd: 4,
    language: "c",
    fixedCode: "long long fib(int n) {\n  // Use a larger data type to reduce the chance of overflow\n  long long dp[n+1];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    if (dp[i-1] > LLONG_MAX - dp[i-2]) {\n      // Handle potential overflow\n      throw std::overflow_error(\"Fibonacci number exceeds the maximum limit.\");\n    }\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}"
  }
]
