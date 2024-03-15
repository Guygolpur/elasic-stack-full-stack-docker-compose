using Microsoft.AspNetCore.Mvc;
using DOTNETBACKEND.Data;
using DOTNETBACKEND.Models;
using System.Linq;
using System.Threading.Tasks;
using Elastic.Apm.Api;

namespace DOTNETBACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NamesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NamesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Names
        [HttpGet]
        public IActionResult GetNames()
        {
            var names = _context.Names.ToList();
            return Ok(names);
        }

        // POST: api/Names
        [HttpPost]
        public async Task<IActionResult> PostName([FromBody] Name name)
        {
            _context.Names.Add(name);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetNames", new { id = name.Id }, name);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteName([FromQuery] string firstName, [FromQuery] string lastName = null)
        {
            var name = _context.Names.FirstOrDefault(n => n.FirstName == firstName && (lastName == null || n.LastName == lastName));
            if (name == null)
            {
                return NotFound();
            }

            _context.Names.Remove(name);
            await _context.SaveChangesAsync();

            return NoContent();
        }




    }
}
