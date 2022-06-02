const userModel = require('../models/user');
module.exports = class API_Featues {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exclueded = ['page', 'sort', 'limit', 'feild'];
    exclueded.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj).replace(
      /(gte|gt|lt|lte)/g,
      (match) => `$${match}`,
    );

    this.query = userModel.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  field() {
    if (this.queryString.field) {
      const field = this.queryString.field.split(',').join(' ');
      this.query = this.query.select(field);
    } else {
      this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
};
