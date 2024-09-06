export interface MenuDish {
  MenuDishID: Number;
  DishName: string;
  DishDescription: string;
  DishTypeID: Number;
  DishType: string;
  Sequence: Number;
  isActive: boolean;

  CreatedDate?: any;
  CreatedBy?: any;
  UpdatedDate?: any;
  UpdatedBy?: any;
}