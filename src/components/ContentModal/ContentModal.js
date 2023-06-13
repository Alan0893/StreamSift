import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { 
  Modal,
  Fade, 
  Button
} from "@mui/material";
import axios from "axios";
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
import Carousel from "../Carousel/Carousel";

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
    : `url(${unavailableLandscape})`,
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
  "& > *": {
    margin: "12px",
  },
  "@media (min-width: 600px)": {
    flexDirection: "row",
    "& > *": {
      margin: "0 12px"
    }
  }
});

 const StyledButton = styled(Button)({
  width: "80%"
 })


export default function TransitionsModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
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
        <Fade in={open}>
          {content && (
            <StyledPaper backdropPath={content.backdrop_path}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="modal_poster"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="modal_backdrop"
                />
                <div className="modal_about">
                  <span className="modal_title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="modal_description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <ButtonContainer>
                    <StyledButton
                      variant="contained"
                      startIcon={<YouTube />}
                      color="error"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </StyledButton>
                    {(content && content.homepage !== "") && (
                      <StyledButton 
                        variant="contained"
                        startIcon={<Devices />}
                        color="primary"
                        target="__blank"
                        href={content.homepage}
                      >
                        Watch Now
                      </StyledButton>
                    )}
                  </ButtonContainer>
                </div>
              </div>
            </StyledPaper>
          )}
        </Fade>
      </StyledModal>
    </>
  );
}