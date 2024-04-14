import React, { useState } from 'react';
import './App.css';
const uuid = require('uuid');

function App() {
  const [image, setImage] = useState('');
  const [uploadResultMessage, setUploadResultMessage] = useState('please upload image');
  const [imagename, setImagename] = useState('placeholder.jpeg');
  const [isAuth, setAuth] = useState(false);

  function sendImage(e) {
    e.preventDefault();
    setImagename(image.name);
    const visitorimagename = uuid.v4();
    fetch(`X XXXXXXXXX dev stage editor/bucketnameXXX/${visitorimagename}.jpeg`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg' // Corrected content type header
      },
      body: image
    }).then(async () => {
      const response = await authenticate(visitorimagename);
      if (response.Message === 'success') {
        setAuth(true);
        setUploadResultMessage(`Hi ${response.firstName} ${response.LastName}, Welcome to work. Hope you have a good day.`);
      } else {
        setAuth(false);
        setUploadResultMessage('Authentication failed');
      }
    }).catch(error => {
      setAuth(false);
      setUploadResultMessage('There is an error');
      console.error(error);
    });
  }

  async function authenticate(visitorimagename) {
    const requesturl = `devXXXXXXX/employee?${new URLSearchParams({
      objectKey: `${visitorimagename}.jpeg`
    })}`;
    return await fetch(requesturl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' // Corrected content type header
      }
    }).then(response => response.json())
      .then(data => {
        return data;
      }).catch(error => console.error(error));
  }

  return (
    <div className="App">
      <h2>CCL project Face recognition System</h2>
      <form onSubmit={sendImage}>
        <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit'>Authentication</button>
      </form>
      <div className={isAuth ? 'success' : 'failure'}>
        {uploadResultMessage}
      </div>
      <img src={require(`./visitors/${imagename}`)} alt="visitor" height={250} width={250} />
    </div>
  );
}

export default App;
