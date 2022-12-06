using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Contracts
{
    public class RegisterUserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public List<IdentityRole> Roles { get; set; }
    }
    public class LoginUserModel:UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }

        public List<RoleModel> Roles { get; set; }
    }
}
