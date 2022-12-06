using BusinessLayer;
using BusinessLayer.Contracts;
using DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LayersOnWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            const string herokuConnectionString = @"Host=ec2-3-226-163-72.compute-1.amazonaws.com;
                                                    Port=5432;
                                                    Username=znurmuvfyjwxjb;
                                                    Password=8d325c6a34900024933d7e5990ad9aead868143056e6c125bf917ea45ab622bc;
                                                    Database=d37dq5fbf4nmbi;
                                                    Pooling=true;
                                                    SSL Mode=Require;
                                                    TrustServerCertificate=True;";
            // const string dockerConnectionString = @"Server=localhost;
            //                                           Port=5432;
            //                                           Username=developer;
            //                                           Password=developer;
            //                                           Database=developer;
            //                                           ";
            services.AddControllersWithViews();
            services.AddSwaggerGen();
            services.AddScoped<IDeviceService, DeviceService>();
            services.AddScoped<IConsumerService, ConsumerService>();
            services.AddScoped<IDataService, DataService>();
            services.AddScoped<IRepository, GenericRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddDbContext<DataAccess.DbContext>(options => options.UseNpgsql(herokuConnectionString));
            services.AddIdentity<IdentityUser, IdentityRole>()
                  .AddEntityFrameworkStores<DataAccess.DbContext>()
                  .AddDefaultTokenProviders();
            #region Cors Origin Request Service
            services.AddCors(options => options.AddPolicy("CorsPolicy",
                            builder =>
                            {
                                builder
                                .WithOrigins("http://localhost:3000")
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials();
                            }));
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            CreateUserRoles(serviceProvider).Wait();
            CreateStartupUsers(serviceProvider);
        }

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            //Adding Admin Role
            var roleCheck = await RoleManager.RoleExistsAsync("Admin");
            if (!roleCheck)
            {
                //create the roles and seed them to the database
                await RoleManager.CreateAsync(new IdentityRole("Admin"));
            }

            roleCheck = await RoleManager.RoleExistsAsync("User");
            if (!roleCheck)
            {
                //create the roles and seed them to the database
                await RoleManager.CreateAsync(new IdentityRole("User"));
            }
        }

        private void CreateStartupUsers(IServiceProvider serviceProvider)
        {
            var userMgr = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var users = userMgr.Users;
            if (!users.Any(x=> x.UserName == "admin@webdotnet.com"))
            {
                var user = new IdentityUser { UserName = "P@ssw0rd" };
                userMgr.CreateAsync(user,  "P@ssw0rd").Wait();
                var registeredUser = userMgr.FindByNameAsync(user.UserName).Result;
                userMgr.AddToRoleAsync(registeredUser, "admin").Wait();
            }
        }
    }
}
