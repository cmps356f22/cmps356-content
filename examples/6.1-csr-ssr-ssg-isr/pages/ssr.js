import Head from "next/head";

const ssr = ({ name }) => {
  return (
    <div>
      <Head>
        <title>Server Side Rendering - {name}</title>
      </Head>
      <div className="content">
        <h2>{name}</h2>
        <p>This page is Rendering with SSG (Server Side Rendering)</p>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await fetch(
    "https://raw.githubusercontent.com/cmps356f22/cmps356-content/main/examples/name.json"
  );
  const json = await data.json();

  return {
    props: {
      name: json.name,
    },
  };
}

export default ssr;
