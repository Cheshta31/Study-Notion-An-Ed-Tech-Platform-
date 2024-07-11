import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
//<--------chip input for tag field--------->
const ChipInput = ({
  id,
  name,
  placeholder,
  label,
  setValue,
  errors,
  getValues,
}) => {
  const [chip, setChip] = useState("");
  const [chipList, setChipList] = useState([]);
  useEffect(() => {
    const tagsArray = getValues()?.courseTags || [];
    setChipList(tagsArray);
  }, []);
  useEffect(() => {
    setValue(name, chipList);
  }, [chipList]);
  const handleChipAdd = (chip) => {
    if (!chip) return;
    chip = chip.trim().toLowerCase();
    if (chipList.some((item) => item === chip)) return;
    setChipList((prevChipList) => [...prevChipList, chip]);
    setChip("");
  };
  const handleChipRemove = (chip) => {
    setChipList((prevChipList) => prevChipList.filter((item) => item !== chip));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && chip.trim() !== "") {
      event.preventDefault();
      handleChipAdd(chip);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-richBlack-5" htmlFor={id}>
        {label} <span className="text-lg text-pink-200">*</span>
      </label>

      {/* chips */}
      <div className="flex flex-wrap gap-2">
        {chipList.map((chip) => (
          <span
            className="flex items-center gap-1 rounded-md bg-caribbeangreen-50 px-2 py-1 text-richBlack-800"
            key={chip}
          >
            {chip}
            <AiFillCloseCircle
              className="cursor-pointer"
              onClick={() => handleChipRemove(chip)}
            />
          </span>
        ))}
      </div>

      <input
        type="text"
        name={name}
        id={id}
        value={chip}
        placeholder={placeholder}
        onChange={(e) => setChip(e.target.value)}
        onKeyDown={handleKeyDown}
        className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
      />
      {errors[name]?.type === "required" && (
        <span className="text-yellow-50">{name} is required</span>
      )}
    </div>
  );
};

export default ChipInput;
