import React, { useState, useEffect } from "react"

const BackendTest = () => {
  const [loginname, setLoginname] = useState("empty")
  const [user, setUser] = useState("empty")

  function login() {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      //credentials: "include",
      body: JSON.stringify({
        query: `mutation {
          login(
            email: "johndoe@example.com"
            password: "password"
          )
        }`
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log("data: ", data)

      setLoginname(data.data.login)
    })
    .catch(() => {
      console.log("error")
    })
  }

  function me() {
    const token = getCookie("token")

    fetch('/graphql', {
      method: 'POST',
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      //credentials: "include",
      body: JSON.stringify({
        query: `query {
          me {
            email
          }
        }`
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log("data: ", data)

      setUser(data.data.me.email)
    })
    .catch(() => {
      console.log("error")
    })
  }

  function getCookie(name) {
    let cookieValue = null

    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";")

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim()

        if (cookie.substring(0, name.length + 1) === (name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          
          break;
        }
      }
    }

    return(cookieValue)
  }

  useEffect(() => {
    //login()
  })
  
  return (
    <div>
      <h1>Token:</h1>

      <button onClick={login}>
        Login
      </button>

      <p>
        {loginname}
      </p>

      <button onClick={me}>
        Me
      </button>

      <p>
        {user}
      </p>
    </div>
  )
}

export default BackendTest