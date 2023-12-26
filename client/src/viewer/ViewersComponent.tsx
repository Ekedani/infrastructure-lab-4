import React, { useState, useEffect } from "react";
import * as ViewerService from "./ViewersService";
import "./ViewersStyle.css";

interface Viewer {
  id: string;
  name: string;
}

const ViewersComponent = () => {
  const [viewers, setViewers] = useState<Viewer[]>([]);
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

  const handleDelete = (id: string) => {
    ViewerService.deleteViewer(id)
      .then(() => {
        setViewers(viewers.filter((viewer) => viewer.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: string) => {
    const updatedName = prompt("Enter new name for the viewer");
    if (updatedName) {
      ViewerService.updateViewer(id, { name: updatedName })
        .then(() => {
          setViewers(
            viewers.map((viewer) =>
              viewer.id === id ? { ...viewer, name: updatedName } : viewer
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
      <ul className="viewers-list">
        {viewers.map((viewer) => (
          <li key={viewer.id} className="viewer-item">
            <span className="viewer-name">{viewer.name}</span>
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
