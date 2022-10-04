/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps() {
  const resp = await fetch(
    "http://localhost:3000/pokemons/all.json"
  );

  return {
    props: {
      pokemons: await resp.json(),
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`ssr/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
