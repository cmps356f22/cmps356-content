import { createContext, useState, useContext } from "react";

const UserContext = createContext({
  userName: "",
  setUserName: () => {}
});

export default function UseContextApp() {
  const [userName, setUserName] = useState("John Smith");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <UserNameInput />
      <br />
      <UserInfo />
    </UserContext.Provider>
  );
}

function UserNameInput() {
  const { userName, setUserName } = useContext(UserContext);
  const changeHandler = (event) => setUserName(event.target.value);

  return <input type="text" value={userName} onChange={changeHandler} />;
}

function UserInfo() {
  const { userName } = useContext(UserContext);
  return <span>{userName}</span>;
}