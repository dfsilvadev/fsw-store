import { Category } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

import { CATEGORIES_ICONS } from "@/constants/category-icon";

interface ICategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: ICategoryItemProps) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-2 rounded-lg py-3"
    >
      {CATEGORIES_ICONS[category.slug as keyof typeof CATEGORIES_ICONS]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
