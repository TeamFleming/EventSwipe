import React from 'react';

//component for each event in the event tinder 
const Event = ({ event, like, dislike }) => {
  // console.log(event);
  return (
    <div>
      {console.log(`ererer: ${typeof event}`)}
    {event 
      ? 
      <div>
        <h1>{event.name.text}</h1>
        <img src={event.logo.url} />
        <div className="event_description">
          <h4>{event.description.text.substr(0, 150)}</h4>
          <section className="event_details">
            <div className="event_loc">
              <span className="Loc">Location: </span>
              <span>{event.location}</span>
            </div>
            <div className="event_link">
              <span className="link">Link: </span>
              <a href={event.url}>{event.url}</a>
            </div>
            <div className="event_date">
              <span className="date">Date: </span>
              <span>{event.start.local.substr(0, 10)}</span>
            </div>
            <div className="time">
              <span className="time">Time: </span>
              <span>{event.start.local.substr(11)}</span>
            </div>
          </section>
        </div>
      </div>
      :
      'Loading...'
    }
    <button onClick={like}>Like</button> 
    <button onClick={dislike}>Dislike</button>
  </div>

  );
}
 

export default Event;