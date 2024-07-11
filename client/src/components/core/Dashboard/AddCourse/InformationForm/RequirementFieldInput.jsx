import React from "react";
import { useState, useEffect } from "react";

const RequirementFieldInput = ({ name, setValue, errors }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const addRequirementHandler = (input) => {
    if (input) {
      input = input.trim();
      if (!requirementList.includes(input)) {
        setRequirementList((prevList) => [...prevList, input]);
        setRequirement("");
      }
    }
  };
  const removeRequirementHandler = (input) => {
    setRequirementList((prevList) => prevList.filter((item) => item !== input));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && requirement.trim() !== "") {
      event.preventDefault();
      addRequirementHandler(requirement);
    }
  };

  //   useEffect(() => {
  //     register[(name, { required: true, validate: (value) => value.length > 0 })];
  //   }, []);
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-richBlack-5">
        Course Requirements <span className="text-lg text-pink-200">*</span>
      </label>

      <input
        type="text"
        name={name}
        id={"requirementField"}
        value={requirement}
        onKeyDown={handleKeyDown}
        placeholder={"Enter Course Requirements..."}
        onChange={(e) => setRequirement(e.target.value)}
        className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
      />

      <button
        type="button"
        onClick={() => addRequirementHandler(requirement)}
        className="font-semibold text-yellow-50"
      >
        ADD
      </button>
      {/* Requirement List */}
      <ul className="list-decimal space-y-2">
        {requirementList.map((requirement) => (
          <li
            key={+new Date() + Math.random()}
            className="flex items-center gap-1 text-richBlack-50"
          >
            {requirement}
            <span
              className="cursor-pointer text-sm text-richBlack-300"
              onClick={() => removeRequirementHandler(requirement)}
            >
              Clear
            </span>
          </li>
        ))}
      </ul>
      {errors[name]?.type === "required" && (
        <span role="alert" className="text-yellow-50">
          {name} is required
        </span>
      )}
    </div>
  );
};

export default RequirementFieldInput;
