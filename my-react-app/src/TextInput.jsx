export default function TextInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <input
        className={`input ${error ? "inputError" : ""}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="errorText">{error}</p>}
    </div>
  );
}
