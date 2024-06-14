function factorial(n: number): number {
  if (n < 0) throw new Error('Value must be positive');

  if (n === 1 || n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(3));
