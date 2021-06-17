import { useState, useCallback, MouseEvent } from "react";

function useNavTabs(items: string[], initial: string) {
  const [tab, setTab] = useState<string>(initial);
  const handleTabs = useCallback((event: MouseEvent) => {
    setTab(event.currentTarget.innerHTML);
  }, []);

  const Tabs = () => {
    return (
      <div className="c-tab">
        {items.map((item: string) => (
          <button
            key={item}
            type="button"
            className={item === tab ? "c-tab-item active" : "c-tab-item"}
            onClick={handleTabs}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };

  return {
    tab,
    Tabs,
  };
}

export default useNavTabs;
