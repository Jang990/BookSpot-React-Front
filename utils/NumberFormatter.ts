const units = [
  { value: 1e8, symbol: "억" },
  { value: 1e4, symbol: "만" },
];

// formatCount(50001234, "회"); // "5000만 회"
// formatCount(12345, "회");    // "1.23만 회"
// formatCount(12305, "회");    // "1.23만 회"
// formatCount(2345, "회");     // "2345 회"
// formatCount(3211234, "회");  // "321만 회"
// formatCount(30123, "회");    // "3.01만 회"
// formatCount(30023, "회");    // "3만 회"
export function formatCount(count: number, unit: string): string {
  if (count < 1e4) {
    return `${count} ${unit}`;
  }

  for (const { value, symbol } of units) {
    if (count >= value) {
      const q = count / value;
      const intDigits = Math.floor(Math.log10(q)) + 1;

      let s: string;
      if (intDigits >= 3) {
        // 정수부가 이미 3자리 이상이면 소수는 버린다
        s = Math.floor(q).toString();
      } else {
        // 부족한 자리만큼 소수점 유지, trailing zero 제거
        const decimals = 3 - intDigits;
        s = q.toFixed(decimals).replace(/\.?0+$/, "");
      }

      return `${s}${symbol} ${unit}`;
    }
  }

  // 여기까지 안 내려온다면 안전장치
  return `${count} ${unit}`;
}
