import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const capitalizeTranslationKey = title.split(" ").map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1);
    });
    document.title = `Patients Care | ${capitalizeTranslationKey.join(" ")}`
  }, [title]);
};

export default useDocumentTitle;
