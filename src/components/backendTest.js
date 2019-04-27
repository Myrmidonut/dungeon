import React, { useState } from "react"

const BackendTest = () => {

  const [token, setToken] = useState("empty")

  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: "include",
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
    console.log('token:', data.data.login)

    setToken(data.data.login)
  })
  .then(() => {
    console.log(token)
  })
  .catch(() => {
    console.log("error")

    setToken("no token")
  })

  return (
    <div>
      <h1>Token:</h1>

      {token}
    </div>
  )
}

export default BackendTest