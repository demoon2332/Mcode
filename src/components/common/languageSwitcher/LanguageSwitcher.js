import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const countries = [
    { value: "en", label: "English", icon: "US" },
    { value: "vi", label: "Vietnamese", icon: "VN" },
  ];
  const animatedComponents = makeAnimated();

  const [defaultLanguage, setDefaultLanguage] = useState(() => {
    const currentLanguage = i18n.language;
    return countries.find((country) => country.value === currentLanguage);
  });

  useEffect(() => {
    const currentLanguage = i18n.language;
    const defaultOption = countries.find((country) => country.value === currentLanguage);
    setDefaultLanguage((prevDefaultLanguage) => {
      // Check if the language has changed before updating the state
      // this will prevent looping setState infinitely (maximum update depth exceeded error)
      if (defaultOption && defaultOption.value !== prevDefaultLanguage?.value) {
        return defaultOption;
      }
      return prevDefaultLanguage;
    });
  }, [i18n.language, countries, setDefaultLanguage]);

  const changeLanguage = (option) => {
    i18n.changeLanguage(option.value);
  };

  return (
    <Select
      components={animatedComponents}
      options={countries}
      onChange={changeLanguage}
      value={defaultLanguage}
      isSearchable
      placeholder={t('select_language')}
      formatOptionLabel={({ value, label, icon }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              alt={icon}
              style={{ width: '20px', height: '20px', margin: '0px 8px' }}
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
