using Microsoft.EntityFrameworkCore;
using DOTNETBACKEND.Models;

namespace DOTNETBACKEND.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Name> Names { get; set; }
    }
}
