import React from "react";
function Welcome({name, age, children}) {
    return (
        <>
            <h1>Welcome {name} [{1 + 3}]</h1>
            {children}
        </>
    );
}
export default Welcome;
