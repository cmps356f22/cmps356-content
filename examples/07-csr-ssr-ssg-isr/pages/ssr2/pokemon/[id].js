/* eslint-disable @next/next/no-img-element */
import {useRouter} from 'next/router';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Details.module.css";

export async function getServerSideProps(context) {
  const id = context.params.id
  const url = `http://localhost:3000/pokemons/${id}.json`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.dir(pokemon)
  return {
    props : {
      pokemon
    }
  }
}

export default function Details({pokemon}) {
  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/ssr2">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`/${pokemon?.image}`}
            alt={pokemon?.name?.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type?.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats?.map(({ name, value }) => (
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
