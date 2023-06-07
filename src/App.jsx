import React, { useEffect, useState, Suspense } from "react";
import { getDishes } from "./services/api.js";
import AllDishes from "./components/AllDishes";
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
      {/* All Dishes */}
      {/* <div>
        <button
          onClick={() => {
            setShowDishes((prev) => !prev);
          }}
        >
          Show All Dishes
        </button>
        {showDishes && (
          <div>
            <Suspense fallback="Loading ...">
              {allDishes.length > 0 ? (
                <div>
                  <AllDishes allDishes={allDishes} />
                  <Categories allDishes={allDishes} />
                </div>
              ) : (
                <div>No dishes found.</div>
              )}
            </Suspense>
          </div>
        )}
      </div> */}

      {/* categories */}
      <div>
        <h1>All Categories</h1>
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
