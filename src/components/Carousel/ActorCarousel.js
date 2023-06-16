import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";
import { Badge, Chip } from "@mui/material";

const handleDragStart = (e) => e.preventDefault();

const Gallery2 = ({ media }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className="carousel">
      <div className="chip-containter">
      <Chip 
        className="chip"
        color="info"  
        style={{ 
          color: 'white',
          fontWeight: 'bold',
          border: '2px solid #0288d1',
          marginTop: 'auto',
          marginBottom: '15px',
          whiteSpace: 'nowrap',
          width: '50%',
          textAlign: 'center',
        }}
        label={c?.media_type === "tv" ? "TV Series" : "Movie"}
        variant="outlined"
        size="small"
      />
      </div>
      <div className="carousel_container" sx={{ position: "relative" }}>
        <Badge
          badgeContent={(c.vote_average).toFixed(1)}
          color={c.vote_average > 6 ? "primary" : "secondary"}
        >
          <img
            src={c.poster_path ? `${img_300}/${c.poster_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carousel_img"
          />
        </Badge>
      </div>
      <b className="carousel_text">
        {c?.title} (
          {(
            c.first_air_date ||
            c.release_date ||
            "-----"
          ).substring(0, 4)})
        </b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    setCredits(media);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      touchTracking
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      keyboardNavigation
    />
  );
};

export default Gallery2;