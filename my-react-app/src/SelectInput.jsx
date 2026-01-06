export default function SelectInput({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <select
        className={`input ${error ? "inputError" : ""}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((opt) => (
          <option key={opt.value || "empty"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
}
