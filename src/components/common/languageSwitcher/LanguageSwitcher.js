// LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const countries = [
    { value: "en", label: "English", icon: "US" },
    { value: "vi", label: "Vietnamese", icon: "VN" },
  ];
  const animatedComponents = makeAnimated();

  const changeLanguage = (option) => {
    i18n.changeLanguage(option.value);
  };

  return (
    <Select
      components={animatedComponents}
      options={countries}
      onChange={changeLanguage}
      isSearchable
      placeholder="Select a country"
      formatOptionLabel={({ value, label, icon }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>
            <img
              alt={icon}
              style={{width: '15px', height: '15px',margin: '0px 6px'}}
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${icon}.svg`}
            />
          </span>
          <span>{label}</span>
        </div>
      )}
    />
  );
};

export default LanguageSwitcher;
