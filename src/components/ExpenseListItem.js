import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";

export default (props) => (
  <div>
    <Link to={`/edit/${props.id}`}>{props.description}</Link>
    <p>
      {numeral(props.amount / 100).format("$0,0.00")}
      -
      {moment(props.createdAt).format("MMMM Do, YYYY")}
    </p>
  </div>
);
