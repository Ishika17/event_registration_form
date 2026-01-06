export default function AlertMessage({ submitState }) {
  if (!submitState.message) return null;

  return (
    <div
      className={`alert ${
        submitState.type === "success" ? "alertSuccess" : "alertError"
      }`}
    >
      {submitState.message}
    </div>
  );
}
