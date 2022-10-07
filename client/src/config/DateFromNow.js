import React from "react";
import Moment from "react-moment";

function DateFromNow({ date }) {
  return <Moment fromNow>{date}</Moment>;
}

export default DateFromNow;
