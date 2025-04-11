import React from 'react';
import CityLayout from '../shared/CityLayout';

const Thalmoor = () => {
  return (
    <CityLayout
      cityName="Thalmoor"
      description="A bustling desert trading hub where Kavari merchants deal in spices, silk, and secrets. The air is thick with scents and opportunity."
      backgroundImage="/public/images/Thalmoor3.png" // <-- du velger bildet!
    >
      <div style={{ textAlign: 'center' }}>
        <p>Welcome to Thalmoor’s market! What would you like to do?</p>
        {/* Placeholders for market, NPCs, etc. */}
      </div>
    </CityLayout>
  );
};

export default Thalmoor;
