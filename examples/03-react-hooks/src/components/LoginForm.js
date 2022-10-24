import { useState } from "react";

function LoginForm () {
/*    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");*/
    const [state, setState] = useState({ email: "", password: "" });

    const handleChange = e => {
        console.dir(e);
        const {name, value} = e.target;
        setState( { ...state, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert(JSON.stringify(state));
    };

    return <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
                name="email" id="email" placeholder="e-mail"
                type="email" required
                value={state.email}
                onChange={handleChange} />

            <label htmlFor='password'>Password</label>
            <input
                name="password" id="password" placeholder="password"
                type="password" required
                value={state.password}
                onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
        <p>email: {state.email}</p>
        <p>password: {state.password}</p>
    </>;    
}

export default LoginForm;