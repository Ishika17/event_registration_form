export default function FormActions({ onReset }) {
  return (
    <div className="actions">
      <button type="submit" className="btn-primary">
        SIGN UP
      </button>
      <button type="button" className="btn-outline" onClick={onReset}>
        RESET
      </button>
    </div>
  );
}
