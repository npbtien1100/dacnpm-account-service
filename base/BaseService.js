import HttpResponse from "../helper/HttpResponse";

import { getPage, getPageSize } from "../utils/Pagination";
import autoBind from "auto-bind";

class BaseService {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getAll(_query) {
    try {
      const { orderBy } = _query;
      const page = getPage(_query.page);
      const size = getPageSize(_query.size);
      console.log(this.model);
      const items = await this.model.findAll({
        limit: size,
        offset: page * size,
        orderBy: orderBy,
      });

      return new HttpResponse(items, { totalCount: items.length });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async get(id) {
    try {
      const item = await this.model.findOne({
        where: { id: id },
        raw: true,
      });

      if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
      }
      return new HttpResponse(item);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async insert(data) {
    try {
      const item = await this.model.create(data);
      if (item) {
        return new HttpResponse(item, { statusCode: 201 });
      }
      throw new Error("Something wrong happened");
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      await this.model.update(data, {
        where: { id: id },
      });
      const item = await this.model.findOne({
        where: { id: id },
        raw: true,
      });

      return new HttpResponse(item);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const item = await this.model.destroy({
        where: { id: id },
      });
      if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
      } else {
        return new HttpResponse(item, { deleted: true });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async hardDelete(id) {
    try {
      const item = await this.model.destroy({
        where: { id: id },
        force: true,
      });

      if (!item) {
        const error = new Error("Item not found");

        error.statusCode = 404;
        throw error;
      } else {
        return new HttpResponse(item, { deleted: true });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default BaseService;
