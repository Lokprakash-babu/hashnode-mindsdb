export enum AVAILABLE_CATEGORIES {
  CUSTOMER_SUPPORT = "customer_support_engineer",
  SALES = "sales",
}
export const ALLOWED_CATEGORIES = [
  AVAILABLE_CATEGORIES.CUSTOMER_SUPPORT,
  AVAILABLE_CATEGORIES.SALES,
];

export const categoriesLabelMap = {
  [AVAILABLE_CATEGORIES.CUSTOMER_SUPPORT]: "Customer Support",
  [AVAILABLE_CATEGORIES.SALES]: "Sales",
};
