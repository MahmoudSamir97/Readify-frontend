import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  const rooms = ["first room", "second room", "third room", "fourth room"];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((item, i) => {
          return <ListGroup.Item key={i}>{item}</ListGroup.Item>;
        })}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
}

export default Sidebar;
