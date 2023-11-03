import React, { useEffect } from "react";

const Jug = ({ capacity, current }) => {
  useEffect(() => {
    console.log(capacity, current);
  }, [capacity, current]);

  return (
    <div>
      <div className="jug" style={{ height: capacity * 20 }}>
        <p>Capacity: {capacity}L</p>
        <p>Current: {current}L</p>
      </div>
    </div>
  );
};

export default Jug;
