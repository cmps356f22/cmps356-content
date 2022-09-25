import Head from "next/head";

const isr = ({ name }) => {
  return (
    <div>
      <Head>
        <title>Inceremental Site Generation - {name}</title>
      </Head>
      <div className="content">
        <h2>{name}</h2>
        <p>
          This page is Rendering with ISR (Inceremental Static Regeneration)
        </p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch(
    "https://raw.githubusercontent.com/cmps356f22/cmps356-content/main/examples/name.json"
  );
  const json = await data.json();

  return {
    props: {
      name: json.name,
    },
    revalidate: 60,
  };
}

export default isr;