import React, { useState, useEffect } from "react";
import * as ViewerService from "./ViewersService";
import "./ViewersStyle.css";

interface Viewer {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: "male" | "female";
}

const ViewersComponent = () => {
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const [newViewer, setNewViewer] = useState<Viewer>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "male",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ViewerService.getAllViewers()
      .then((response) => {
        setViewers(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while fetching viewers");
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewViewer({ ...newViewer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ViewerService.createViewer(newViewer)
      .then((response) => {
        setViewers([...viewers, response.data]);
        setNewViewer({
          firstName: "",
          lastName: "",
          birthDate: "",
          gender: "male",
        }); // Reset the form
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id: string | undefined) => {
    ViewerService.deleteViewer(id)
      .then(() => {
        setViewers(viewers.filter((viewer) => viewer.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: string | undefined) => {
    const updatedName = prompt("Enter new name for the viewer");
    if (updatedName) {
      ViewerService.updateViewer(id, { name: updatedName })
        .then(() => {
          setViewers(
            viewers.map((viewer) =>
              viewer.id === id ? { ...viewer, firstName: updatedName } : viewer
            )
          );
        })
        .catch((error) => console.error(error));
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="viewers-container">
      <h2 className="viewers-title">Viewers</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={newViewer.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={newViewer.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={newViewer.birthDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="gender"
          value={newViewer.gender}
          onChange={handleInputChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Add Viewer</button>
      </form>

      <ul className="viewers-list">
        {viewers.map((viewer) => (
          <li key={viewer.id} className="viewer-item">
            <span className="viewer-name">{viewer.firstName}</span>
            <div className="viewer-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(viewer.id)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(viewer.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewersComponent;
