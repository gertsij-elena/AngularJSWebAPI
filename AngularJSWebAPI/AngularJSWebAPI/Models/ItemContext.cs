using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace AngularJSWebAPI.Models
{
    public class ItemContext:DbContext
    {
        public ItemContext()
            : base("DefaultConnection")
        {
        }
       
        public DbSet<Item> Items { get; set; }
    }
}