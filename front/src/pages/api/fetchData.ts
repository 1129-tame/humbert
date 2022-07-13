export async function fetchData1(): Promise<string> {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  console.log('sleep')
  await sleep(1000)
  console.log('sleep2')
  return `Hello, hofehoge2`
}
