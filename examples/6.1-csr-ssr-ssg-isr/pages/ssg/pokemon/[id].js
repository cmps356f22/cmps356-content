/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Details.module.css";

export async function getStaticPaths() {
  const resp = await fetch(
    "http://localhost:3000/pokemons/all.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
    revalidate: 30
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `http://localhost:3000/pokemons/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    revalidate: 60,
  };
}

export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/ssg">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
