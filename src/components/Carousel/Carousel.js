import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);
  
  const navigate = useNavigate();

  const handleActorClick = (actor) => {
    navigate(`/actor?name=${encodeURIComponent(actor.name)}`);
  };

  const items = credits.map((c) => (
    <div 
      className="carousel"
      onClick={() => handleActorClick(c)}
      key={c.id}
    >
      <p className="carousel_text">{c?.character}</p>
      <div className="carousel_container" sx={{ position: "relative" }}>
        <Badge
          badgeContent={(c.popularity).toFixed(1)}
          color={c.popularity < 30 ? "error" : c.popularity < 70 ? "secondary" : "success"}
        >
          <img
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carousel_img"
          />
        </Badge>
      </div>
      <b className="carousel_text">{c?.name}</b>
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
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
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

export default Gallery;