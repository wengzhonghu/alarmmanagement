import http from '../util/http';

const remove = {
  p: ['delete,/opcconfig/*'],
  r: params => {
    return instance.delete(`/opcconfig/${params.id}`)
  }
};

const getbyid = {
    p: ['get,/opcconfig/*'],
    r: params => {
      return instance.get(`/opcconfig/${params.id}`)
    }
};

const create = {
    p: ['post,/opcconfig'],
    r: params => {
      return instance.get(`/opcconfig/${params.id}`)
    }
}

export {
  remove,
  getbyid,
  create
}
