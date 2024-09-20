import { memo, useCallback } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { FixedSizeList as List } from "react-window";

export const SelectCustom = ({
  options,
  getOptionLabel,
  getOptionValue,
  handleChange,
  placeholder,
}) => {
  return (
    <Select
      options={options}
      getOptionLabel={(data) => getOptionLabel && getOptionLabel(data)}
      getOptionValue={(data) => getOptionValue && getOptionValue(data)}
      onChange={(e) => {
        handleChange && handleChange(e);
      }}
      required
      className='z-10'
      placeholder={placeholder}
      components={{
        MenuList: ({ children, ...props }) => (
          <List height={300} itemCount={children.length} itemSize={35}>
            {({ index, style }) => <div style={style}>{children[index]}</div>}
          </List>
        ),
      }}
    />
  );
};

export const SelectAsyncCustom = ({ options, handleChange, placeholder, value }) => {
  const loadOptions = async (inputValue) => {
    try {
      const filteredOptions = options.filter((option) =>
        option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      return filteredOptions.map((option) => ({
        value: option.value,
        label: option.label,
      }));
    } catch (error) {
      console.error("Error loading options:", error);
      return [];
    }
  };

  const MenuList = memo((props) => {
    const { options, children } = props;
    return (
      <List height={200} itemCount={options.length} itemSize={45} width='100%' className="z-999">
        {({ index, style }) => (
          <div style={style} key={index}>
            {children[index]}
          </div>
        )}
      </List>
    );
  });

  return (
    <AsyncSelect
      required
      components={{ MenuList }}
      loadOptions={useCallback(loadOptions, [])}
      onChange={(e) => {
        handleChange && handleChange(e);
      }}
      getOptionLabel={(data) => data.label}
      getOptionValue={(data) => data.value}
      placeholder={placeholder}
      cacheOptions
      className='z-10'
      defaultOptions={options.slice(0, 200)}
      value={value}
    />
  );
};
