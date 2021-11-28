import React from "react";
import { genres } from "../genresArray";
import "./index.scss";

function GenreCheckbox(props) {
  const [genre, setGenre] = React.useState([]);

  React.useEffect(() => {
    props.handleFilter(genre);
  }, [genre]);

  const genreHandler = (checked, id) => {
    if (checked) {
      setGenre([...genre, id]);
    } else {
      const checkedGenre = genre.filter((item) => {
        return item !== id;
      });
      setGenre(checkedGenre);
    }
  };

  const genreRender = genres.map((item, index) => {
    return (
      <div key={index} className="checkbox-box">
        <input
          className="genre-checkbox"
          type="checkbox"
          id={item}
          onChange={(e) => {
            genreHandler(e.currentTarget.checked, item);
          }}
        />
        <label className="genre-label" htmlFor={item}>
          {item}
        </label>
      </div>
    );
  });
  return <div className="genre-checkbox-container">{genreRender}</div>;
}

export default GenreCheckbox;
