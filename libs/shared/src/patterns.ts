export enum Patterns {
    PRODUCT_CREATE = 'product.create',
    PRODUCT_FIND_ALL = 'product.findAll',
    PRODUCT_FIND_ONE = 'product.findOne',
    PRODUCT_RESERVE = 'product.reserve',   // reserve stock for a sale
    PRODUCT_RELEASE = 'product.release',   // release stock on failure/cancel
    SALES_CREATE = 'sales.create',
    SALES_FIND_ALL = 'sales.findAll',
  }