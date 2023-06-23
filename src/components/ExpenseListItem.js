import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <div>
    <Link to={`/edit/${props.id}`}>{props.description}</Link>
    <span>({props.amount})</span>
    <span>Created {props.createdAt}</span>
  </div>
);
