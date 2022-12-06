using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DataAccess
{
    public class GenericRepository : IRepository
    {
        private readonly DbContext _dbContext;
        public GenericRepository(DbContext dbContext)
        {
            this._dbContext = dbContext;
        } 
        public void Add<T>(T entity) where T : class
        {
            _dbContext.Add(entity);
        }
        
        public List<T> GetAll<T>() where T : class
        {
            return _dbContext.Set<T>().ToList();
        }

        public T GetByGuid<T>(Guid id) where T : class
        {
            return _dbContext.Set<T>().Find(id);
        }

        public T GetByUsername<T>(String username) where T : class
        {
            return _dbContext.Set<T>().Find(username);
        }
        public void Update<T>(T entity) where T : class
        {
            _dbContext.Update(entity);
            _dbContext.Set<T>().Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<T>(T entity) where T : class
        {
            _dbContext.Set<T>().Remove(entity);

        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}
