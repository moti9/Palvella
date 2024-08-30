// import React from 'react';
// import cat1 from "../assets/images/cat1.jpg";
// import cat2 from "../assets/images/cat2.jpg";
// import cat3 from "../assets/images/cat3.jpg";
// import cat4 from "../assets/images/cat4.jpg";
// import cat5 from "../assets/images/cat5.jpg";
// import cat6 from "../assets/images/cat6.jpg";
// import cat7 from "../assets/images/cat7.jpg";
// import cat8 from "../assets/images/cat8.jpg";
// import cat9 from "../assets/images/cat9.png";

import { useEffect, useState } from "react";
import BusinessAPI from "../services/BusinessAPI";
import { ImSpinner9 } from "react-icons/im";
import { Spinner } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
<FaSpinner className="spinner" />;


const BusinessCategory = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      const response = await BusinessAPI.getAllCategoryInfo();
      setCategoryList(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchCategory();
    setTimeout(() => { setLoading(false); }, 3000);
    // setLoading(false);
  }, []);


  // const categories = [
  //   { image: cat1, statement: "Clothing" },
  //   { image: cat2, statement: "Fruits & Vegetable" },
  //   { image: cat3, statement: "Dairy" },
  //   { image: cat4, statement: "Gadgets" },
  //   { image: cat5, statement: "Garage" },
  //   { image: cat6, statement: "Restaurant" },
  //   { image: cat7, statement: "Sweets & Bakery" },
  //   { image: cat8, statement: "Medical Store" },
  //   { image: cat9, statement: "Grocery Store" }
  // ];

  return (
    <>
      {loading && (<div className="text-center">
        <Spinner animation="border" role="status" />
      </div>)}

      {(categoryList && categoryList.length > 0) ? (
        <>
          <h3 style={{ fontFamily: "sans-serif", marginLeft: '120px', marginBottom: '20px', marginTop: '20px' }}>Category</h3>
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                {categoryList.map((category, index) => (
                  <div className="col" key={index}>
                    <div className="card shadow-sm">
                      <img src={category.image} className="card-img-top" alt={`Cat ${index + 1}`} style={{ height: "18rem" }} />
                      <div className="card-body d-flex flex-column justify-content-center">
                        <p className="card-text text-center mb-0"><strong>{category.display_name}</strong></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (<div className="text-center">
        <span>Loading....</span>
      </div>)}
    </>
  );
}

export default BusinessCategory;
