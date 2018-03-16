using Toposort.Models;
using Microsoft.EntityFrameworkCore;

namespace Toposort.Data
{
    public class TopoContext : DbContext
    {
        public TopoContext(DbContextOptions<TopoContext> options) : base(options)
        {
        }

        public DbSet<Test> Test {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>().ToTable("Test");
        }
}
}