import ProductModel from '../models/product.model.js';
import mongoose from 'mongoose';

const parseQuery = (query) => {
  if(!query) return {};
  // support "category:Electrónica" or "available"
  if(query.startsWith('category:')) {
    return { category: query.replace('category:', '') };
  }
  if(query === 'available' || query === 'available:true') {
    return { stock: { $gt: 0 } };
  }
  if(query === 'available:false' || query === 'unavailable') {
    return { stock: { $lte: 0 } };
  }
  // otherwise treat as category value
  return { category: query };
};

export default {
  async getProducts({ limit = 10, page = 1, sort, query, baseUrl='' }) {
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const filter = parseQuery(query);
    const sortObj = {};
    if(sort === 'asc') sortObj.price = 1;
    else if(sort === 'desc') sortObj.price = -1;

    const totalDocs = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit) || 1;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const products = await ProductModel.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const buildLink = (p) => {
      if(!baseUrl) return null;
      const url = new URL(baseUrl);
      const params = new URLSearchParams();
      params.set('limit', String(limit));
      params.set('page', String(p));
      if(sort) params.set('sort', sort);
      if(query) params.set('query', query);
      return url.origin + url.pathname + '?' + params.toString();
    };

    return {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? buildLink(page - 1) : null,
      nextLink: hasNextPage ? buildLink(page + 1) : null
    };
  },

  async createProduct(data) {
    const p = new ProductModel(data);
    return p.save();
  },

  async getById(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) return null;
    return ProductModel.findById(id).lean();
  }
};
