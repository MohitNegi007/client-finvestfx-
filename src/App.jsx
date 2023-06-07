import React, { useEffect, useState, Suspense } from "react";
import { getDishes } from "./services/api.js";
import Categories from "./components/Categories";
function App() {
  const [allDishes, setAllDishes] = useState([]);
  const [showDishes, setShowDishes] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDishes();
        setAllDishes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Select Category</h1>
        <div>
          <Suspense fallback="Loading ...">
            {allDishes.length > 0 ? (
              <Categories data={allDishes} />
            ) : (
              <div>No dishes found.</div>
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
