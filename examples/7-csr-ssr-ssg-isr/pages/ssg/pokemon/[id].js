/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Details.module.css";

export async function getStaticPaths() {
  // products 1 ... 1000
  // 1..100 popular products
 //products/200

  const resp = await fetch(
    "https://raw.githubusercontent.com/cmps350s22/6-csr-ssr-ssg-isr/main/public/pokemons/all.json"
  );
  const pokemon = await resp.json();

  return {
    //paths: [{ params: { id: 1}}, { params: { id: 2}}, { params: { id: 3}}]
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://raw.githubusercontent.com/cmps350s22/6-csr-ssr-ssg-isr/main/public/pokemons/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    revalidate: 30
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
