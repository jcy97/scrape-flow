// waitFor을 통해 비동기 환경에서 원하는 만큼 코드를 멈출 수 있다.
// 그냥 setTimeOut을 쓰면 비동기 환경에서 못멈춘다.
export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
