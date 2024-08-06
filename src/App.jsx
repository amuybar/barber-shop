import { useState } from 'react';
import './App.css';

function App() {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/https://stackblitzstarterszxa5fg-acso--3000--41692973.local-credentialless.webcontainer.io/register' : '/https://stackblitzstarterszxa5fg-acso--3000--41692973.local-credentialless.webcontainer.io/login';
    const body = isRegister ? { email, name, password } : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {isRegister && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleToggle}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
}

export default App;
