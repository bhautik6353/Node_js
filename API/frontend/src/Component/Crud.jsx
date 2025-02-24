import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Crud() {
  const [admin, setAdmin] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null); // To track which admin is being edited

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios.get('http://localhost:1009/getAdmin')
      .then(response => {
        setAdmin(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the admins!', error);
      });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    if (editId) {
      // Update existing admin
      axios.put(`http://localhost:1009/updateAdmin?id${editId}`, formData)
        .then(response => {
          fetchAdmins(); // Refresh the admin list
          resetForm();
        })
        .catch(error => {
          console.error('There was an error updating the admin!', error);
        });
    } else {
      // Add new admin
      axios.post('http://localhost:1009/addAdmin', formData)
        .then(response => {
          fetchAdmins(); // Refresh the admin list
          resetForm();
        })
        .catch(error => {
          console.error('There was an error adding the admin!', error);
        });
    }
  };

  const handleDeleteAdmin = (id) => {
    axios.delete(`http://localhost:1009/deleteAdmin?id=${id}`)
      .then(response => {
        fetchAdmins(); // Refresh the admin list
      })
      .catch(error => {
        console.error('There was an error deleting the admin!', error);
      });
  };

  const handleEditAdmin = (admin) => {
    setName(admin.name);
    setEmail(admin.email);
    setPassword(admin.password);
    setEditId(admin._id); // Set the ID of the admin being edited
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setImage('');
    setEditId(null); // Reset edit ID
  };

  return (
    <div>
      <h1>Admin List</h1>
      <form onSubmit={handleAddAdmin} className="form-container">
        <h2>{editId ? "Update Admin" : "Add Admin"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <input
          type="file"
          name="image"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" className="add-btn">
          {editId ? "Update Admin" : "Add Admin"}
        </button>

        {editId && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel Edit
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admin.map(admin => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td><img src={`http://localhost:1009/${admin.image}`} alt="" width="100" /></td>
              <td>
                <button onClick={() => handleEditAdmin(admin)}>Edit</button>
                <button onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}