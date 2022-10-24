import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Contact from "./Contact";

const fetcher = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

function AppWithSuspense() {
  const { error, data } = useQuery(["contacts"], fetcher, { suspense: true });

  //if (isLoading) return <p>Loading</p>;
  //if (error) return <p>An error occurred</p>;

  return (
      <Suspense fallback={<h1> Loading ...</h1>}>
        <div className="App">
          {data.map(({ id, name, email, company }) => (
            <Contact
              key={id}
              name={name}
              email={email}
              tagline={company.catchPhrase}
            />
          ))}
        </div>
      </Suspense>
  );
}

export default AppWithSuspense;
