import './FilterCheckbox.css';

export default function FilterCheckbox({
  isCheck,
  changeStateCheckbox,
  inactiveFirstVisit
}) {

  return (
    <label className={`search__filter-checkbox ${inactiveFirstVisit && 'search__filter-checkbox_type_disabled'}`}>
      <input
        className="search__checkbox-hidden"
        type="checkbox"
        onChange={() => changeStateCheckbox()}
        disabled={inactiveFirstVisit}
      />
      <svg className="search__check-svg" width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="small-tumbler">
          <rect
            className={`search__check-svg-rect ${!isCheck ? 'search__check-svg-rect_type_active' : ''}`}
            id="tumbler-on" width="36" height="20" rx="10" fill="#2be080"
          />
          <circle
            className={`search__check-svg-circle ${!isCheck ? 'search__check-svg-circle_type_active' : ''}`}
            id="tumbler-on-2" cx="26" cy="10" r="8" fill="#ffffff"
          />
        </g>
      </svg>
      <span className={`search__checkbox-text ${inactiveFirstVisit && 'search__checkbox-text_type_disabled'}`}>Короткометражки</span>
    </label>
  );
}
