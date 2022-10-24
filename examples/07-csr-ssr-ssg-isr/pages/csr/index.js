/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    async function getPokemons() {
      const url = "http://localhost:3000/pokemons/all.json";
      const response = await fetch(url);
      setPokemons(await response.json());
    }
    getPokemons()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`csr/pokemon/${pokemon.id}`}>
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
