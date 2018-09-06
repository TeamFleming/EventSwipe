import React from "react";

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites }) => (
  <div>
    <h4> Faves </h4>
    <ul>
      {console.log("these are the favorites", favorites)}
      {favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name.text},{favorite.date},
          <a href={favorite.url}>Get Tickets!!!</a>,
          <button onClick={favorite => {
            this.props.removeFaves(this, favorite)
          }}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesList;
