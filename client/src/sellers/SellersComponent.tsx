import React, { useState, useEffect } from "react";
import * as SellerService from "./SellerService";

type Seller = {
  id: string;
  name: string;
};

const SellersComponent = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SellerService.getAllSellers()
      .then((response: any) => {
        setSellers(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setError("Failed to load sellers.");
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
      <h2>Sellers</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>{seller.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SellersComponent;
