using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderApi.Model;

namespace OrderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly OrderContext _context;
        public CustomerController(OrderContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IQueryable<Customer> GetCustomers()
        {
            return _context.Customers;
            //return custData;
        }
    }
}
