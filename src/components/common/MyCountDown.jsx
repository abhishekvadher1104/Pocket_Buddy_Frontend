import React from "react";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>⏰ Time's up!</span>;
  } else {
    return (
      <span>
        {days}d : {String(hours).padStart(2, '0')}h : {String(minutes).padStart(2, '0')}m : {String(seconds).padStart(2, '0')}s
      </span>
    );
  }
};

const MyCountDown = ({ startDate, endDate }) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return <p>⏳ Offer Will start from {start.toLocaleString()}</p>;
  } else if (now >= start && now <= end) {
    return (
    <div>
      <p>offer expires in</p>
         <Countdown
        date={end}
        renderer={renderer}
      />
    </div>
    );
  } else {
    return <p>❌ Offer expired</p>;
  }
};

export default MyCountDown;
