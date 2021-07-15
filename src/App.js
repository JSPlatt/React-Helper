import './App.css';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

function App() {

  const { 
    loginWithPopup, 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated,
    } = useAuth0()

    function callApi() {
      axios
        .get("http://localhost:4000")
        .then(res => console.log(res.data))
        .catch(error => console.log (error.message))
    }

    function callProtectedApi() {
      axios
        .get("http://localhost:4000/protected")
        .then(res => console.log(res.data))
        .catch(error => console.log (error.message))
    }

  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
        <ul>
          <li><button onClick={loginWithPopup}>Login with Popup</button></li>
          <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
        <h3>User is { isAuthenticated? "Logged in" : "Not logged in" }</h3>
          <ul>
              <li>
                  <button onClick={callApi}>Call API route</button>
              </li>
              <li>
                  <button onClick={callProtectedApi}>Call Protected API route</button>
              </li>
          </ul>
        { isAuthenticated && (
        <pre style={{textAlign: 'start'}}>{JSON.stringify(user, null, 2)}
        </pre>
        )}
    </div>
  );
}

export default App;
