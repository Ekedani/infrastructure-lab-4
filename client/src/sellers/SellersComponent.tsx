import React, { useState, useEffect } from "react";
import * as SellerService from "./SellerService";
import "./SellersStyle.css";

interface Seller {
  id: string;
  name: string;
}

const SellersComponent = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SellerService.getAllSellers()
      .then((response) => {
        setSellers(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while fetching sellers");
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id: any) => {
    SellerService.deleteSeller(id)
      .then(() => {
        setSellers(sellers.filter((seller) => seller.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: any) => {
    const updatedName = prompt("Enter new name for the seller");
    if (updatedName) {
      SellerService.updateSeller(id, { name: updatedName })
        .then(() => {
          setSellers(
            sellers.map((seller) =>
              seller.id === id ? { ...seller, name: updatedName } : seller
            )
          );
        })
        .catch((error) => console.error(error));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sellers-container">
      <h2 className="sellers-title">Sellers</h2>
      <ul className="sellers-list">
        {sellers.map((seller) => (
          <li key={seller.id} className="seller-item">
            <span className="seller-name">{seller.name}</span>
            <div className="seller-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(seller.id)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(seller.id)}
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

export default SellersComponent;
