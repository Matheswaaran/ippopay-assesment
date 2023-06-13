import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { getAvailableTypes } from "../utils/index.js";
import { child, getDatabase, onValue, push, ref, set } from "firebase/database";

const Problem1 = (props) => {
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResultsFromFirebase();
  }, []);

  useEffect(() => {
    setOutput("");
  }, [password]);

  const fetchResultsFromFirebase = () => {
    const db = getDatabase();
    onValue(ref(db, "problem_1/"), (snapshot) => {
      const data = snapshot.val();
      let results = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      setResults(results);
    });
  };

  const processOutput = () => {
    let available_types = getAvailableTypes(password);
    if (password.length < 6) {
      setOutput(`${Math.max(6 - password.length, 3 - available_types)}`);
    } else if (password.length > 20) {
      let to_be_removed = 20 - password.length;
      let to_be_replaced = 3 - available_types;
      setOutput(`${Math.abs(to_be_removed + to_be_replaced)}`);
    } else {
      let to_be_replaced = 3 - available_types;
      setOutput(`${Math.abs(to_be_replaced)}`);
    }
  };

  const saveResultToFirebase = () => {
    const db = getDatabase();
    const new_key = push(child(ref(db), "problem_1")).key;

    set(ref(db, `problem_1/${new_key}`), {
      password: password,
      output: output,
    });
  };

  return (
    <div>
      <div className="text-2xl text-[#00136A] font-semibold">
        Problem 1: Password Checker
      </div>

      <div className="mt-16 flex space-x-16">
        <div className="w-1/2">
          <div className="text-xl font-semibold mb-8">Solution:</div>
          <Input
            rootClassName="text-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          { title: "Password", dataIndex: "password" },
          { title: "Output", dataIndex: "output" },
        ]}
        className="mt-4"
        dataSource={results}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default Problem1;
