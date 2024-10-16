import React, { useEffect, useState, useRef } from "react";
export const Carousel = ({
  isLoading,
  imageList,
  imagePerSlide = 1,
  customPrevBtn,
  customNextBtn,
  imageLimit = imageList.length,
  onImageClick = () => {},
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imageRef = useRef(0);

  useEffect(() => {
    if (imageList.length > 0) {
      setCurrentImg(0);
    }
  }, [imageList]);
  const goToPrev = () => {
    setCurrentImg((prevImg) => (prevImg == 0 ? imageLimit - 1 : prevImg - 1));
  };
  const goToNext = () => {
    setCurrentImg((prevImg) => (prevImg == imageLimit - 1 ? 0 : prevImg + 1));
  };

  return (
    <>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div className="carousel" style={{ width: imageWidth * imagePerSlide }}>
          <div
            className="image-container"
            style={{ transform: `translateX(-${currentImg * imageWidth}px)` }}
          >
            {imageList.map((image, index) => (
              <>
                <img
                  src={image.url}
                  key={image.id}
                  alt={image.title}
                  ref={imageRef}
                  onClick={() => onImageClick(image, index)}
                  onLoad={() => setImageWidth(imageRef?.current?.offsetWidth)}
                />
              </>
            ))}
          </div>
          {customPrevBtn instanceof Function ? (
            customPrevBtn(goToPrev)
          ) : (
            <button className="btn btn-prev" onClick={goToPrev}>
              Prev
            </button>
          )}
          {customNextBtn instanceof Function ? (
            customNextBtn(goToPrev)
          ) : (
            <button className="btn btn-next" onClick={goToNext}>
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
};
