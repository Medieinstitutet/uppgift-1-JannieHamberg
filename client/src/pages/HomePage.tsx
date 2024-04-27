import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import { Hero } from "../Components/Hero";
import { HomeSection1 } from "../Components/HomeSection1";
import { HomeSection2 } from "../Components/HomeSection2";
import { HomeSection3 } from "../Components/HomeSection3";


const App = () => {
/*   const [user, setUser] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch('http://localhost:3000/auth/authorize', {
        credentials: "include"
      })
      const data = await response.json()
      if (response.status === 200) {
        setUser(data.email)
      } else {
        setUser("")
      }
    }
    authorize()
  }, [])

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const register = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const data = await response.json();
    console.log(data);
  };

  const login = async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const data = await response.json();
    if (response.status === 200) {
        setEmail(data.email);
        setPassword("");
        window.location.href = "/";
    } 
    else {
        alert("Du har angivit ett felaktigt använamn eller lösenord. Försök igen!");
        setEmail("");
        setPassword("");
    }
};

const logout = async () => {
  const response = await fetch('http://localhost:3000/auth/logout', {
      method: "POST",
      credentials: "include"
  })

  if (response.status === 200) {
    setUser("")
  }
} */


return (
  <div className=" home-bg w-full">
    <Hero/>
    <HomeSection1 />
    <HomeSection2 />
    <HomeSection3 />
{/*     <div className=" text-center mt-20">
      <h1 className="text-lg font-semibold mb-4 mt-20">{user ? `INLOGGAD: ${user}` : "UTLOGGAD"}</h1>
    </div>
    <div className="home-box-bg mt-20 ">
    <form onSubmit={register} className="flex flex-col items-center gap-2 mb-4">
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required className="border rounded p-2" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required className="border rounded p-2" />
      <button type="submit" className="hompage-btn btn btn-white pl-10 pr-10 text-l shadow-xl">Registrera</button>
    </form>
    
    <div className="flex flex-col items-center gap-2 mb-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="border rounded p-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border rounded p-2" />
      <button onClick={login} className="hompage-btn btn btn-white pl-10 pr-10 text-l shadow-xl">Logga in</button>
      <button onClick={logout} className="hompage-btn btn btn-white pl-10 pr-10 text-l shadow-xl">Logga ut</button>
    </div>
    </div> */}
  </div>
);

}


export default App