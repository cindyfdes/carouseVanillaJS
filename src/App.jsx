import { useEffect, useState } from "react";

import "./App.css";
import { Carousel } from "./Components/Carousel";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const fetchImagesList = async (imageLimit) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`
      );
      const imageList = await response.json();
      setImageList(imageList);
      console.log("image list ", imageList);
    } catch (ex) {
      console.error("Error in fetching images", ex);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchImagesList(8);
  }, []);

  return (
    <>
      <div className="carousel-container">
        <Carousel
          isLoading={isLoading}
          imageList={imageList}
          imagePerSlide={2}
          imageLimit={4}
        />
      </div>
    </>
  );
}

export default App;
