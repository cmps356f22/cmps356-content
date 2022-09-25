import Head from "next/head";
import React from "react";

const Csr = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const getAllData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://raw.githubusercontent.com/cmps356f22/cmps356-content/main/examples/name.json"
      );
      const json = await data.json();
      setData(json);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getAllData();
    return () => {
      setData(null);
    };
  }, []);

  return (
    <div>
      <div className="content">
        {isLoading && <h2>Loading...</h2>}
        {isError && <h2>Oops, something went wrong!</h2>}
        {data && !isError && (
          <>
            <h2>{data.name}</h2>
            <p>This page is Rendering with SSG (Server Side Rendering)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Csr;
