export function ResetButton({ onClick }) {
  return (
    <button
      className="mt-5 border-0 rounded-md bg-stone-300 py-2 px-4"
      onClick={onClick}
    >
      Очистить
    </button>
  );
}
