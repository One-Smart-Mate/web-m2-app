import { RefObject, useLayoutEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useTableHeight = (ref: RefObject<Element>) => {
  // Keep the Table the height of the parent.
  const [tableHeight, setTableHeight] = useState<number>();
  const resizeTable = useDebouncedCallback(
    () => {
      const node = ref.current;
      if (!node) {
        return;
      }
      const { height } = node.getBoundingClientRect();
      // height of the content minus the header and footer table
      setTableHeight(height - 55 - 50);
    },
    100,
    {
      trailing: true,
      maxWait: 100,
    }
  );

  useLayoutEffect(() => {
    resizeTable();
    window.addEventListener("resize", resizeTable);

    return () => {
      window.removeEventListener("resize", resizeTable);
    };
  }, [resizeTable]);

  return tableHeight;
};
