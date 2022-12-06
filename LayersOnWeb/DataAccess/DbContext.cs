using DataAccess.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DbContext : IdentityDbContext<IdentityUser>
    {
        public DbContext(DbContextOptions<DbContext> options)
       : base(options)
        {
        }
        public DbSet<DeviceEntity> DeviceEntities { get; set; }
        public DbSet<DataEntity> DataEntities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            const string herokuConnectionString = @"Host=ec2-3-226-163-72.compute-1.amazonaws.com;
                                                    Port=5432;
                                                    Username=znurmuvfyjwxjb;
                                                    Password=8d325c6a34900024933d7e5990ad9aead868143056e6c125bf917ea45ab622bc;
                                                    Database=d37dq5fbf4nmbi;
                                                    Pooling=true;
                                                    SSL Mode=Require;
                                                    TrustServerCertificate=True;";
            // const string herokuConnectionString = @"Server=localhost;
            //                                           Port=5432;
            //                                           Username=developer;
            //                                           Password=developer;
            //                                           Database=developer;
            //                                           ";
            options.UseNpgsql(herokuConnectionString);
        }
    }
}
