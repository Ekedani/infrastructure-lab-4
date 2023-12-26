import React, { useState, useEffect } from "react";
import * as SellerService from "./SellerService";
import "./SellersStyle.css";

enum GenderType {
  male = "male",
  female = "female",
}

interface Seller {
  _id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: GenderType;
}

const SellersComponent = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newSeller, setNewSeller] = useState<Seller>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: GenderType.female,
  });

  useEffect(() => {
    SellerService.getAllSellers()
      .then((response) => {
        setSellers(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while fetching sellers");
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSeller({ ...newSeller, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newSeller);
    SellerService.createSeller(newSeller)
      .then((response) => {
        setSellers([...sellers, response.data]);
        setNewSeller({
          firstName: "",
          lastName: "",
          birthDate: "",
          gender: GenderType.female,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id: any) => {
    SellerService.deleteSeller(id)
      .then(() => {
        setSellers(sellers.filter((seller) => seller?._id !== id));
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
              seller._id === id ? { ...seller, firstName: updatedName } : seller
            )
          );
        })
        .catch((error) => console.error(error));
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={newSeller.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={newSeller.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="gender"
          value={newSeller.gender}
          onChange={handleInputChange}
          placeholder="Gender"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={newSeller.birthDate}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Seller</button>
      </form>

      <ul className="sellers-list">
        {sellers.map((seller) => (
          <li key={seller._id} className="seller-item">
            <span className="seller-name">{seller.firstName}</span>
            <span className="seller-birthdate">
              {formatDate(seller.birthDate)}
            </span>
            <div className="seller-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(seller._id)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(seller._id)}
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
