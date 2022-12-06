using System;
using System.Collections.Generic;

namespace DataAccess
{
    public interface IRepository
    {
        List<T> GetAll<T>() where T : class;
        void Add<T>(T entity) where T:class;
        public T GetByGuid<T>(Guid id) where T : class;
        public T GetByUsername<T>(String username) where T : class;
        public void Update<T>(T entity) where T : class;
        public void Delete<T>(T entity) where T : class;
        void SaveChanges();
    }
}
