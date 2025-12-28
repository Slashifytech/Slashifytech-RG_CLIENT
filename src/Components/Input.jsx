import React, { useEffect, useRef, useState } from "react";
import { extractFileNames } from "../helper/commonHelperFunc";
import { ImBin } from "react-icons/im";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const InputField = ({
  type,
  className,
  value,
  name,
  onchange,
  placeholder,
  autocomplete,
  max,
  disabled,
  label,
  
}) => {
  return (
    <>
    
      <input
        type={type}
        className={className}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onchange}
        autoComplete={autocomplete}
        max={max}
        disabled={disabled}
      />
    </>
  );
};
const CustomSelect = ({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder,
  isDisabled = false,
  customClass = "",
  imp,
}) => {
  return (
    <>
      {label && (
        <div className="font-semibold">
          {label}
          {imp ? <span className="text-red-500">*</span> : ""}
        </div>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`select-input ${customClass}`}
        disabled={isDisabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

const SelectInput = ({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder,
  isDisabled = false,
  customClass = "",
  imp,
}) => {
  return (
    <>
      {label && (
        <div className="font-semibold">
          {label}
          {imp ? <span className="text-red-500">*</span> : ""}
        </div>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`select-input ${customClass}`}
        disabled={isDisabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

const CustomInput = ({
  type,
  className,
  onChange,
  value,
  name,
  placeHolder,
  checked,
  handleClick,
  errorMessage,
  title,
  imp,
  customText,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <span className="font-semibold pb-3 ">
        {" "}
        {title} <span className="text-red-500">{imp ? "*" : ""}</span>
      </span>
      <input
        type={type}
        className={`${className} ${errorMessage ? "border-red-500" : ""}`}
        onChange={onChange}
        onClick={handleClick}
        value={value}
        placeholder={placeHolder}
        checked={checked}
        name={name}
      />

      {errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

const GroupedInput = ({
  title,
  stateName,
  errors,
  onChange,
  leftFields,
  rightFields,
  required
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
const today = new Date().toISOString().split("T")[0];

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="flex flex-col gap-2 mt-4">
          <label className="font-semibold">
            {field.label}{" "}
            <span className="text-red-500">{field.required ? "*" : ""}</span>
          </label>
          <select
            name={field.name}
            value={stateName[field.name]}
            onChange={onChange}
            className="w-full h-10 bg-white rounded-md px-3 outline-none "
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {field.customText && (
            <span className="font-medium text-[13px] text-black">
              {field.customText}
            </span>
          )}
          {errors[field.name] && (
            <span className="text-red-500 text-sm">{errors[field.name]}</span>
          )}
        </div>
      );
    }
    if (field.type === "multiselect") {
      const selectedValues = stateName[field.name] || [];
      const wrapperRef = useRef(null);

      const handleSelect = (value) => {
        let updated;
        if (selectedValues.includes(value)) {
          updated = selectedValues.filter((item) => item !== value);
        } else {
          updated = [...selectedValues, value];
        }

        onChange({
          target: { name: field.name, value: updated },
        });
      };

      const clearAll = () => {
        onChange({
          target: { name: field.name, value: [] },
        });
      };

      // Close dropdown on clicking outside
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setDropdownOpen(false);
          }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }, []);

      return (
        <div
          ref={wrapperRef}
          key={field.name}
          className="flex flex-col gap-2 mt-4 relative w-full"
        >
          <label className="font-semibold">
            {field.label}{" "}
            <span className="text-red-500">{field.required ? "*" : ""}</span>
          </label>

          <div
            className="border bg-white rounded-md px-3 py-2 cursor-pointer flex justify-between items-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="flex flex-wrap gap-2">
              {selectedValues.length > 0 ? (
                selectedValues.map((val, idx) => {
                  const label = field.options.find(
                    (opt) => opt.value === val
                  )?.label;
                  return (
                    <span
                      key={idx}
                      className="bg-primary text-white rounded-md px-2 text-sm"
                    >
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-gray-500">
                  {field.placeholder || "Select options"}
                </span>
              )}
            </div>

            {/* Dropdown icon */}
            <span className="text-gray-600 text-lg">
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </div>

          {/* CLEAR ALL BUTTON */}
          {selectedValues.length > 0 && (
            <button
              onClick={clearAll}
              className="text-red-500 text-sm underline self-end mt-1"
            >
              Clear All ✕
            </button>
          )}

          {dropdownOpen && (
            <div className="absolute top-[90px] left-0 z-20 bg-white shadow-md border rounded-md w-full max-h-40 overflow-auto transition-all duration-200">
              {field.options?.map((option, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 cursor-pointer flex justify-between items-center ${
                    selectedValues.includes(option.value)
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {selectedValues.includes(option.value) && <span>✓</span>}
                </div>
              ))}
            </div>
          )}

          {errors[field.name] && (
            <span className="text-red-500 text-sm">{errors[field.name]}</span>
          )}
        </div>
      );
    }

    if (field.limitDate) {
  return (
    <div key={field.name} className="flex flex-col gap-2 mt-4">
      <label className="font-semibold">
        {field.label}{" "}
        <span className="text-red-500">{field.required ? "*" : ""}</span>
      </label>

      <input
        type="date"
        name={field.name}
        max={today}    // disable future dates
        value={stateName[field.name] || ""}
        onChange={onChange}
        className="w-full h-10 bg-white rounded-md px-3 outline-none border border-gray-300"
      />

      {errors[field.name] && (
        <span className="text-red-500 text-sm">{errors[field.name]}</span>
      )}
    </div>
  );
}
    // Default: Render input field
    return (
      <>
        <CustomInput
          key={field.name}
          title={field.label}
          imp={field.required}
          className="w-full h-10 bg-white rounded-md px-3 outline-none "
          type={field.type}
          name={field.name}
          placeHolder={field.placeholder}
          value={stateName[field?.name]}
          onChange={onChange}
          errorMessage={errors[field?.name]}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="md:flex gap-20 items-start">
        {/* Left Column */}
        <div className="flex flex-col md:gap-4 md:w-[30%] md:mx-0 mx-6">
          {leftFields?.map((field) => renderField(field))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col md:gap-4 md:w-[30%] md:mx-0 mx-6">
          {rightFields?.map((field) => renderField(field))}
        </div>
      </div>
    </div>
  );
};

const FileUpload = ({
  label = "Upload File",
  acceptedFormats = ["image/jpeg", "image/png", "application/pdf"],
  onFileSelect,
  deleteFile,
  name,
  customClass,
  errorMessage = "Please use JPG, JPEG, PNG, and PDF format.",
  fileUrl,
  maxFileSizeMB = 5,
  imp,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(fileUrl || null);
  const [fileName, setFileName] = useState("No file selected");

  useEffect(() => {
    if (fileUrl) {
      const extractedFileName = extractFileNames(fileUrl);
      setFileName(extractedFileName);
      setPreviewUrl(fileUrl);
    }
  }, [fileUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!acceptedFormats.includes(file.type)) {
        setError(errorMessage);
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileName("No file selected");
        return;
      }

      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > maxFileSizeMB) {
        setError(`File size should not exceed ${maxFileSizeMB}MB`);
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileName("No file selected");
        return;
      }

      setSelectedFile(file);
      setError("");
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);

      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleDelete = () => {
    if (deleteFile) {
      deleteFile();
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileName("No file selected");
  };

  const handlePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  return (
    <div className={`flex flex-col gap-2 font-poppins ${customClass} `}>
      <label className="text-[14px] text-black mt-3 font-semibold">
        {label} {imp ? <span className="text-red-500">*</span> : ""}
      </label>
      <div className="flex md:flex-row-reverse sm:flex-col items-center gap-2 ">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id={`file-input-${name}`}
          name={name}
          disabled={!!selectedFile || fileUrl}
          accept={acceptedFormats.join(",")}
        />
        <label
          htmlFor={`file-input-${name}`}
          className={`px-4 py-2 ${
            selectedFile || fileUrl
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white"
          } border rounded cursor-pointer`}
        >
          Browse
        </label>
        <div
          className="flex-1 px-4 py-2 border border-gray-300 text-[14px] rounded text-black bg-input cursor-pointer"
          onClick={handlePreview}
        >
          {fileName.slice(0, 28)} {/* Display the file name */}
        </div>
        {(selectedFile || fileUrl) && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-2 py-2 bg-primary text-white rounded"
          >
            <ImBin />
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <small className="text-gray-500">{errorMessage}</small>
    </div>
  );
};

const ToggleButton = ({ value, name, onChange, checkedToggle }) => {
  const handleToggleChange = () => {
    const newStatus = !checkedToggle ? "approved" : "send";
    onChange(newStatus);
  };
  return (
    <label className="relative inline-block w-14 h-8">
      <input
        type="checkbox"
        className="peer opacity-0 w-0 h-0"
        value={value}
        name={name}
        onChange={handleToggleChange}
        checked={checkedToggle}
      />
      <span className="absolute inset-0 bg-purple-300 rounded-full transition-all duration-300 ease-in-out peer-checked:bg-green-600"></span>
      <span className="absolute left-0.5 bottom-0.5 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></span>
    </label>
  );
};
const ImageComponent = ({ src, alt, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setImageSrc(profilePic);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={className}
      onError={handleError}
    />
  );
};

const PasswordField = ({
  name,
  value,
  handleInput,
  showPassword,
  toggleVisibility,
  error,
  label,
}) => {
  return (
    <>
      <div className=" relative font-poppins">
        <span className="text-black font-semibold text-[14px]">{label}*</span>
        <CustomInput
          className="w-full h-12 bg-input text-body rounded-md  px-3 outline-none placeholder:text-[16px]"
          name={name}
          value={value}
          onChange={handleInput}
          type={showPassword ? "text" : "password"}
          placeHodler={label}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-3 top-10 text-[18px] flex items-center"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
      </div>
    </>
  );
};

export function MultiSelectInput({
  label = "",
  name = "",
  options = [],
  value = [],
  onChange,
  errors,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = (selected) => {
    let updated;
    if (value.includes(selected)) {
      updated = value.filter((item) => item !== selected);
    } else {
      updated = [...value, selected];
    }

    onChange({
      target: { name, value: updated },
    });
  };

  const clearAll = () => {
    onChange({
      target: { name, value: [] },
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <label className="font-semibold">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Input Box */}
      <div
        className="border bg-white rounded-md px-3 py-2 cursor-pointer flex justify-between items-center mt-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-wrap gap-2 w-[80%]">
          {value.length > 0 ? (
            value.map((val, idx) => {
              const label = options.find((opt) => opt.value === val)?.label;
              return (
                <span
                  key={idx}
                  className="bg-primary text-white rounded-md px-2 text-sm"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <span className="text-gray-500">Select Options...</span>
          )}
        </div>

        <span className="text-gray-600 text-lg">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Clear All */}
      {value.length > 0 && (
        <button
          onClick={clearAll}
          className="text-red-500 text-sm underline self-end mt-1"
        >
          Clear All ✕
        </button>
      )}

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-[999] bg-white shadow-md border rounded-md w-[45%] max-h-40 overflow-auto transition-all duration-200 mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer flex justify-between items-center ${
                value.includes(option.value)
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {value.includes(option.value) && "✓"}
            </div>
          ))}
        </div>
      )}

      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  );
}

export {
  SelectInput,
  CustomSelect,
  InputField,
  CustomInput,
  GroupedInput,
  FileUpload,
  ToggleButton,
  ImageComponent,
  PasswordField,
};

export default InputField;
