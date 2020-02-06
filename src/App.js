import React, { useState } from 'react';
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  
  const initialFormState = { id: null, name: '', username: ''};
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }

  const deleteUser = id => {
    setUsers( users.filter( user => user.id !== id))
  }

  const editRow = user => {
    setEditing(true);
    console.log('editing', editing);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    console.log('editing', editing);
    setUsers(users.map( user => (user.id === id ? updatedUser : user )));
  }

  const dumpObj = obj => {
    let c=[];
    for (let k in obj) {
      c.push(`${k}: ${obj[k]}`);
    }
    return c.join('; ');
  }

  return (
    <div className="container">
      <p>current user: { dumpObj(currentUser) }</p>
      <p>editing: {editing}</p>
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          {editing ? (
          <EditUserForm 
            editing={editing}
            currentUser={currentUser}
            updateUser={updateUser}
            setEditing={setEditing}
          />
          ) : (
          <AddUserForm addUser={addUser} />
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
