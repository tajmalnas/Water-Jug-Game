import React, { useEffect, useState } from "react";
import Jug from "./Jug";
import "./styles.css";

const WaterJugProblem = () => {
  const [jugX, setJugX] = useState(0);
  const [jugY, setJugY] = useState(0);
  const [output, setOutput] = useState("");
  const [ans, setAns] = useState([]);

  const [jug1, setJug1] = useState(5);
  const [jug2, setJug2] = useState(3);
  const [target, setTarget] = useState(4);

  const canMeasureWater = function (x, y, z) {
    let current = [0];
    const visited = {
      0: true
    };
    if (x + y < z) {
      console.log(x, y);
      return false;
    }
    if (x === z || y === z || z + y === z) {
      console.log("the answer is : ", x, y);
      setJugX(x);
      setJugY(y);
      return true;
    }
    while (current.length > 0) {
      const next = [];
      const push = (num) => {
        if (!visited[num]) {
          visited[num] = true;
          next.push(num);
        }
      };
      for (const num of current) {
        if (num === z) {
          console.log("the answer is : ", num, 0);
          if (num > jug1) {
            setJugX(jug1);
            setJugY(num - jug1);
          } else {
            setJugX(num);
            setJugY(0);
          }
          return true;
        }
        if (num + x <= x + y) {
          console.log(num + x, y);
          push(num + x);
        }
        if (num + y <= x + y) {
          console.log(x, num + y);
          push(num + y);
        }
        if (num - y >= 0) {
          console.log(x, num - y);
          push(num - y);
        }
        if (num - x >= 0) {
          console.log(num - x, y);
          push(num - x);
        }
      }
      current = next;
    }
    return false;
  };
  const [flag, setFlag] = useState(false);
  const clickHere = () => {
    console.log(jug1, jug2, target);
    const ch = canMeasureWater(Number(jug1), Number(jug2), Number(target));
    console.log(ch);
    if (ch === true) {
      setOutput("The target is Achivable");
      setFlag(true);
    }
    if (ch === false) {
      setOutput("The target is Not Achivable");
      setFlag(false);
    }
  };

  function myFunction(a, b) {
    if (b === 0) {
      return a;
    }
    return myFunction(b, a % b);
  }

  const gcdChecker = (x, y, z) => {
    const gcd = myFunction(x, y);
    console.log(gcd);
    if (z > x + y) {
      return false;
    }
    if (z % gcd === 0) {
      return true;
    } else {
      return false;
    }
  };

  const [checker, setChecker] = useState("");
  const [f, setF] = useState(false);

  const gcdfunction = () => {
    const ch = gcdChecker(Number(jug1), Number(jug2), Number(target));
    console.log(ch);
    if (ch === true) {
      setChecker("The target is Achivable");
      setF(true);
    }
    if (ch === false) {
      setChecker("The target is Not Achivable");
      setF(false);
    }
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {output.length > 1 &&
        (flag === true ? (
          <div
            style={{ textAlign: "center", fontSize: "3rem", color: "green" }}
          >
            {output}
          </div>
        ) : (
          <div style={{ textAlign: "center", fontSize: "3rem", color: "red" }}>
            {output}
          </div>
        ))}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
        <Jug capacity={jug1} current={jugX} />
        <Jug capacity={jug2} current={jugY} />
      </div>
      <div className="inputs">
        <div style={{ marginLeft: "20px" }}>
          <label>Jug1 capacity</label>
          <br />
          <input
            type="number"
            placeholder="jug1 capacity"
            value={jug1}
            onChange={(e) => setJug1(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div style={{ marginLeft: "20px" }}>
          <label>Jug2 capacity</label>
          <br />
          <input
            placeholder="jug2 capacity"
            type="number"
            value={jug2}
            onChange={(e) => setJug2(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div style={{ marginLeft: "20px" }}>
          <label>Target</label>
          <br />
          <input
            placeholder="target"
            value={target}
            type="number"
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      </div>
      <button onClick={clickHere}>Solve</button>
      <div className="output">{output}</div>
      <div>
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          {" "}
          Check whether target is achievable
        </div>
        <button onClick={gcdfunction}>Check using gcd</button>
        {checker.length > 1 &&
          (f === true ? (
            <div
              style={{ textAlign: "center", fontSize: "3rem", color: "green" }}
            >
              {checker}
            </div>
          ) : (
            <div
              style={{ textAlign: "center", fontSize: "3rem", color: "red" }}
            >
              {checker}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WaterJugProblem;
