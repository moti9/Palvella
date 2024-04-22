// import React from 'react';
import cat1 from "../assets/images/cat1.jpg";
import cat2 from "../assets/images/cat2.jpg";
import cat3 from "../assets/images/cat3.jpg";
import cat4 from "../assets/images/cat4.jpg";
import cat5 from "../assets/images/cat5.jpg";
import cat6 from "../assets/images/cat6.jpg";
import cat7 from "../assets/images/cat7.jpg";
import cat8 from "../assets/images/cat8.jpg";
import cat9 from "../assets/images/cat9.png";

const BusinessCategory = () => {
  
  const categories = [
    { image: cat1, statement: "Clothing" },
    { image: cat2, statement: "Fruits & Vegetable" },
    { image: cat3, statement: "Dairy" },
    { image: cat4, statement: "Gadgets" },
    { image: cat5, statement: "Garage" },
    { image: cat6, statement: "Restaurant" },
    { image: cat7, statement: "Sweets & Bakery" },
    { image: cat8, statement: "Medical Store" },
    { image: cat9, statement: "Grocery Store" }
  ];

  return (
    <>
      <h3 style={{ fontFamily: "sans-serif", marginLeft: '120px', marginBottom: '20px', marginTop: '20px' }}>Category</h3>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            
            {categories.map((category, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm">
                  <img src={category.image} className="card-img-top" alt={`Cat ${index + 1}`} />
                  <div className="card-body d-flex flex-column justify-content-center">
                    <p className="card-text text-center mb-0"><strong>{category.statement}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessCategory;
