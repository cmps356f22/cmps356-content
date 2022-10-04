/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getStaticProps() {
  const resp = await fetch(
    "https://raw.githubusercontent.com/cmps350s22/6-csr-ssr-ssg-isr/main/public/pokemons/all.json"
  );

  return {
    props: {
      pokemons: await resp.json()
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
            <Link href={`ssg/pokemon/${pokemon.id}`}>
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
