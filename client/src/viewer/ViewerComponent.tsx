import React, { useState, useEffect } from "react";
import * as ViewerService from "./ViewerService";

type Viewer = {
  id: string;
  name: string;
};

const ViewersComponent = () => {
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ViewerService.getAllViewers()
      .then((response: any) => {
        setViewers(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setError(error.message || "Failed to load viewers.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Viewers</h2>
      <ul>
        {viewers.map((viewer) => (
          <li key={viewer.id}>{viewer.name}</li>
          // Render other details of the viewer as needed
        ))}
      </ul>
    </div>
  );
};

export default ViewersComponent;
