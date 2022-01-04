export const filterCategories = (categories) => {
  return categories.filter((category) => {
    if (
      category.name === "Uncategorized" ||
      category.name === "News" ||
      category.name === "Videos"
    ) {
      return false;
    } else {
      return true;
    }
  });
};
