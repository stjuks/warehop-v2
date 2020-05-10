const routes = {
  products: '/products',
  productDetails: '/products/:id',
  productForm: '/products/new',
  purchases: '/purchases',
  purchaseDetails: '/purchases/:id',
  purchaseForm: {
    new: '/purchases/new',
    edit: '/purchases/edit',
  },
  sales: '/sales',
  saleForm: {
    new: '/sales/new',
    edit: '/sales/edit',
  },
  saleDetails: '/sales/:id',
  expenses: '/expenses',
  expenseDetails: '/expenses/:id',
  incomes: '/incomes',
  incomeDetails: '/incomes/:id',
  partners: '/partners',
  partnerDetails: '/partners/:id',
  partnerForm: '/partners/new',
  statistics: '/statistics',
  settings: '/settings',
};

export default routes;
