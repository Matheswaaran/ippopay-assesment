import React, { useEffect, useState } from "react";
import { Button, Input, Table, Tooltip } from "antd";
import { child, getDatabase, onValue, push, ref, set } from "firebase/database";
import { InfoCircleOutlined } from "@ant-design/icons";
import { findMin } from "../utils/index.js";

const Problem2 = (props) => {
  const [array, setArray] = useState("");
  const [output, setOutput] = useState("0");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResultsFromFirebase();
  }, []);

  useEffect(() => {
    setOutput("");
  }, [array]);

  const fetchResultsFromFirebase = () => {
    const db = getDatabase();
    onValue(ref(db, "problem_2/"), (snapshot) => {
      const data = snapshot.val();
      let results = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      setResults(results);
    });
  };

  const processOutput = () => {
    let array_values = array.split(",").map((number) => Number(number));
    console.log("array_values", array_values);
    let result = findMin(array_values, array_values.length);
    console.log("result", result);
    setOutput(`${result}`);
  };

  const saveResultToFirebase = () => {
    const db = getDatabase();
    const new_key = push(child(ref(db), "problem_2")).key;

    set(ref(db, `problem_2/${new_key}`), {
      array: array,
      output: output,
    });
  };

  return (
    <div>
      <div className="text-2xl text-[#00136A] font-semibold">
        Problem 2: Minimum Sum Difference in an Array
      </div>

      <div className="mt-16 flex space-x-16">
        <div className="w-1/2">
          <div className="text-xl font-semibold mb-8">Solution:</div>
          <Input
            rootClassName="text-xl"
            value={array}
            onChange={(e) => setArray(e.target.value)}
            suffix={
              <Tooltip title="Add comma seperated values. Like '1,2,3,4'">
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
          <div className="mt-8 space-x-8">
            <Button size="large" onClick={processOutput}>
              Process Output
            </Button>
            <Button size="large" onClick={saveResultToFirebase}>
              Save Result
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-xl font-semibold mb-8">Output:</div>
          {output ? (
            <div className="text-xl text-[#00136A] font-bold">{output}</div>
          ) : (
            <span className="text-sm italic">
              Tap process output to see result
            </span>
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="text-xl font-semibold">Previous Results:</div>
      </div>
      <Table
        columns={[
          { title: "#", dataIndex: "id" },
          { title: "Array", dataIndex: "array" },
          { title: "Output", dataIndex: "output" },
        ]}
        className="mt-4"
        dataSource={results}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default Problem2;
