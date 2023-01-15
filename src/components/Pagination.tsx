interface PaginationProps {
  value: number;
  totalPages: number;
  onChange?: (p: number) => void;
}

export function Pagination(props: PaginationProps) {
  const { value, totalPages, onChange } = props;

  function handleBack() {
    onChange?.(Math.max(value - 1, 0));
  }

  function handleNext() {
    onChange?.(Math.min(value + 1, totalPages));
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="page" className="mr-2">
        Page
      </label>
      <div>
        <button className="bg-sky-500 px-2 mr-2" onClick={handleBack}>
          Back
        </button>
        <input
          name="page"
          type="number"
          min={0}
          max={totalPages}
          value={value + 1}
          onChange={(e) => onChange?.(Number(e.target.value) - 1)}
          className="border border-slate-500 pl-2 w-16"
        />
        <button className="bg-sky-500 px-2 ml-2" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
