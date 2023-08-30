import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GridStyled, Photo, PhotoWrapper } from "./Grid.styled.js";
import { useEffect, useState } from "react";
import axios from "axios";

export const Grid = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.unsplash.com/photos", {
        params: {
          page,
          per_page: 10,
        },
        headers: {
          Authorization:
            "Client-ID Uc9HZgL1NJ_E0mP9qu3w_nAgbcS_SX0upeXFvPm9S7c",
        },
      })
      .then((res) => {
        setLoading(false);
        setPhotos((data) => [...data, ...res.data]);
      });
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage =
        (scrollPosition / (fullHeight - windowHeight)) * 100;

      if (!loading && scrollPercentage > 80) {
        // Вызвать ваше событие или выполнить какое-либо действие
        console.log("Прокручено более 80%");
        setPage((page) => page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  console.log(photos);
  return (
    <GridStyled>
      <ResponsiveMasonry>
        <Masonry gutter="20px" columnsCount={3}>
          {photos.length &&
            photos.map(({ urls: { small } }, idx) => (
              <PhotoWrapper key={idx}>
                <Photo src={small} alt="" />
              </PhotoWrapper>
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </GridStyled>
  );
};
