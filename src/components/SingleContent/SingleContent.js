import { Badge, Chip } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import ActorModal from "../ContentModal/ActorModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  data
}) => {
  return (
    (media_type === "tv" || media_type === "movie" ? (
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={(vote_average).toFixed(1)}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          
          <Chip 
            className="chip"
            color="info"  
            style={{ 
              color: 'white',
              fontWeight: 'bold',
              border: '2px solid #0288d1',
            }}
            label={media_type === "tv" ? "TV Series" : "Movie"}
            variant="outlined"
            size="small"
          />
          <span className="subTitle">{date}</span>
        </span>
      </ContentModal>
    ) : (
      <ActorModal data={data} id={id}>
        <Badge
          badgeContent={(vote_average).toFixed(1)}
          color={vote_average > 60 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          
          <Chip 
            className="chip"
            color="info"  
            style={{ 
              color: 'white',
              fontWeight: 'bold',
              border: '2px solid #0288d1',
            }}
            label={media_type}
            variant="outlined"
            size="small"
          />
          <span className="subTitle">{date}</span>
        </span>
      </ActorModal>
    ))
  );
};

export default SingleContent;