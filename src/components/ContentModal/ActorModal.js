import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { 
  Modal,
  Fade, 
} from "@mui/material";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import ActorCarousel from "../Carousel/ActorCarousel";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledPaper = styled("div")(({ backdropPath }) => ({
  width: "90%",
  height: "80%",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  padding: "16px 16px 24px",
  backgroundImage: backdropPath
    ? `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${img_500}/${backdropPath})`
    : `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9)), url(${unavailableLandscape})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));


export default function TransitionsModal({ children, data, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  console.log(data)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {    
    setContent(data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const calculateAge = (birthday, deathday) => {
    if (birthday) {
      const birthDate = new Date(birthday);
      const currentDate = deathday ? new Date(deathday) : new Date();

      let age = currentDate.getFullYear() - birthDate.getFullYear();

      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }

    return null; // Return null if birthday is not available
  };


  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade component={content} in={open}>
          {content && (
            <StyledPaper 
              backdropPath={
                content.known_for.length > 0 
                ? content.known_for[0].backdrop_path 
                : unavailable
              }>
              <div className="ContentModal">
                <img 
                  src={
                    content.profile_path
                      ? `${img_500}/${content.profile_path}`
                      : unavailable
                  }
                  alt={content.name}
                  className="modal_poster"
                />
                <img 
                  src={
                    content.profile_path
                      ? `${img_500}/${content.profile_path}`
                      : unavailable
                  }
                  alt={content.name}
                  className="modal_profile"
                />
                <div className="modal_about">
                  <span className="modal_title">
                    {content.name} {
                      content.details.birthday 
                      ? `(${calculateAge(content.details.birthday, content.details.deathday)})` 
                      : ''
                    }
                  </span>

                  {content.details.place_of_birth && (
                    <i className="tagline">{content.details.place_of_birth}</i>
                  )}

                  <span className="modal_description">
                    {content.details.biography}
                  </span>
                  
                  {content.details.place_of_birth && (
                    <b className="known_for">Known For:</b>
                  )}
                  <div>
                    <ActorCarousel id={id} media={data.known_for} />
                  </div>
                </div>
              </div>
            </StyledPaper>
          )}
        </Fade>
      </StyledModal>
    </>
  );
}