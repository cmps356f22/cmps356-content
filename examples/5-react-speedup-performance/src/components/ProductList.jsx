import {useMemo} from "react";
/** Tweak based on your machine performance to get some lag */
const COUNT = 3000;

/** Return a list of items based on @param searchTerm */
export function searchProducts(searchTerm) {
  if (searchTerm == '') return []
  return [...Array(COUNT)].map(
    () => {
      console.log(searchTerm);
      return (searchTerm ? (searchTerm + ' ') : '')
        + Math.floor(Math.random() * COUNT)
    }
  );
}

/** Return a list of items based on @param searchTerm */
export function Products({ searchTerm }) {
  const items = useMemo(() => searchProducts(searchTerm), [searchTerm]);

  return <ProductsList items={items} />
}

/** @returns random characters */
export function randomChars() {
  return Math.random().toString(36).slice(2, 7);
}

/** 
 * This component is intentionally designed to be slow 
 * - bad keys
 * - inline styles
 */
export function ProductsList({ items }) {
  return (
    <div>
      {items.map((product, i) => (
        <div key={i + product} style={{
          margin: '1rem 0',
          backgroundColor: 'lightskyblue',
          borderRadius: '4px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
          padding: '10px',
        }}>{product}</div>
      ))}
    </div>
  );
}