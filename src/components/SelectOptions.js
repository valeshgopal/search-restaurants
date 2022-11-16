import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectOptions = ({
  slugOptions,
  vbnameOptions,
  bnameOptions,
  setSelectedSlugOptions,
  setSelectedVbnameOptions,
  setSelectedBnameOptions,
}) => {
  const [slugValue, setSlugValue] = useState([]);
  const [vbnameValue, setVbnameValue] = useState([]);
  const [bnameValue, setBnameValue] = useState([]);

  useEffect(() => {
    if (slugValue.length > 0) {
      setSelectedSlugOptions(slugValue);
    }
  }, [slugValue]);

  useEffect(() => {
    if (vbnameValue.length > 0) {
      setSelectedVbnameOptions(vbnameValue);
    }
  }, [vbnameValue]);

  useEffect(() => {
    if (bnameValue.length > 0) {
      setSelectedBnameOptions(bnameValue);
    }
  }, [bnameValue]);

  return (
    <div>
      <Select
        isMulti
        value={slugValue}
        name='filters'
        options={slugOptions}
        onChange={(data) => {
          setSlugValue(data);
        }}
      />
      <Select
        isMulti
        value={vbnameValue}
        name='filters'
        options={vbnameOptions}
        onChange={(data) => setVbnameValue(data)}
      />
      <Select
        isMulti
        value={bnameValue}
        name='filters'
        options={bnameOptions}
        onChange={(data) => setBnameValue(data)}
      />
    </div>
  );
};

export default SelectOptions;
