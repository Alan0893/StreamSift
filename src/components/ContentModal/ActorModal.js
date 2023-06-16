import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { 
  Modal,
  Fade, 
  Button
} from "@mui/material";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import {
  YouTube,
  Devices
} from "@mui/icons-material";
import Carousel from "../Carousel/ActorCarousel";

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

const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",

  "@media (min-width: 600px)": {
    flexDirection: "row",
  }
});

 const StyledButton = styled(Button)({
  marginBottom: "5px",
  marginRight: "10px",
  marginLeft: "10px",
  width: "80%"
 })


export default function TransitionsModal({ children, data, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

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
                    content.known_for.length > 0
                      ? `${img_500}/${content.known_for[0].backdrop_path}`
                      : unavailable
                  }
                  alt={content.name}
                  className="modal_backdrop"
                />
                <div className="modal_about">
                  <span className="modal_title">
                    {content.name}(
                    {(
                      content.details.birthday || "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.details.place_of_birth && (
                    <i className="tagline">{content.details.place_of_birth}</i>
                  )}

                  <span className="modal-description">
                    {content.biography}
                  </span>

                  <div>
                    <Carousel id={id} media={data.known_for} />
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