interface ItemsPerPageProps {
  value: number;
  onChange?: (i: number) => void;
}

export function ItemsPerPage(props: ItemsPerPageProps) {
  const { value, onChange } = props;
  const choices = [20, 40, 60, 80, 100];

  return (
    <div className="flex flex-col">
      <label htmlFor="items-per-page" className="mr-2">
        Items per page
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        name="items-per-page"
        className="border border-slate-500"
      >
        {choices.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
