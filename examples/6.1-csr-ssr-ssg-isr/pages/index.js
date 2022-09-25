import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <div className="home">
      <Head>
        <title>Next JS Rendering Methode - Rahmat Agung Julians</title>
      </Head>
      <main className="content">
        <h2> Next JS Rendering Methode</h2>
        <ul>
          <li>
            <Link href="/ssg">Static Site Generation</Link>{" "}
          </li>
          <li>
            <Link href="/isr">Incremental Static Regeneration</Link>
          </li>
          <li>
            <Link href="/csr">Client Side Rendering</Link>
          </li>
          <li>
            <Link href="/ssr">Server Side Rendering</Link>{" "}
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
