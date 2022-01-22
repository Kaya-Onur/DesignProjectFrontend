import React from 'react'

export default function Input(props) {
    const {label,error,name,onChange,type,disabled,placeholder}=props
    const className=error ? "form-control is-invalid" : "form-control"
  return (
    <div className="form-group mt-3">
      <label className="text-center">{label}</label>
      <input
        className={className}
        name={name}
        onChange={onChange}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
      ></input>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
