import { useAmp } from 'next/amp';

function Home() {
  const config = {}
  return <h1>My AMP Page</h1>
}

export const config = {
  foo: 'bar',
  amp: true
}

export default Home;
