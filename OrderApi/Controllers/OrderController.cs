using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderApi.Model;
using System.Web.Http.Description;
//using System.Web.Http;

namespace OrderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderContext _context;
        public OrderController(OrderContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<System.Object> GetOrders()
        {
            var result = (from a in _context.Orders
                          join b in _context.Customers on a.CustomerID equals b.CustomerID

                          select new
                          {
                              a.OrderID,
                              a.OrderNo,
                              Customer = b.Name,
                              a.PMethod,
                              a.GTotal
                          }).ToListAsync();

            return await result;
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(long id)
        {
            var order = (from a in _context.Orders
                         where a.OrderID == id

                         select new
                         {
                             a.OrderID,
                             a.OrderNo,
                             a.CustomerID,
                             a.PMethod,
                             a.GTotal,
                             DeletedOrderItemIDs = ""
                         }).FirstOrDefault();

            var orderDetails = (from a in _context.OrderItems
                                join b in _context.Items on a.ItemID equals b.ItemID
                                where a.OrderID == id

                                select new
                                {
                                    a.OrderID,
                                    a.OrderItemID,
                                    a.ItemID,
                                    ItemName = b.Name,
                                    b.Price,
                                    a.Quantity,
                                    Total = a.Quantity * b.Price
                                }).ToList();

            return Ok(new{order,orderDetails});
        }

        [HttpPost]
        [ResponseType(typeof(Order))]
        public ActionResult PostOrder(Order order)
        {
            try
            {
                if (order.OrderID == 0)
                {
                    _context.Orders.Add(order);
                    _context.SaveChanges();
                }
                else
                    _context.Entry(order).State = EntityState.Modified;

                foreach (var item in order.OrderItems)
                {
                    if (item.OrderItemID == 0)
                    {
                        item.OrderID = order.OrderID;
                        _context.OrderItems.Add(item);
                    }
                    else
                        _context.Entry(item).State = EntityState.Modified;
                }

                if (order.DeletedOrderItemIDs != string.Empty)
                {
                    foreach (var id in order.DeletedOrderItemIDs.Split(',').Where(x => x != ""))
                    {
                        OrderItem x = _context.OrderItems.Find(Convert.ToInt64(id));
                        _context.OrderItems.Remove(x);
                    }
                }


                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(long id)
        {
            var orderToDelete = _context.Orders.Find(id);

            if (orderToDelete != null)
            {
                var relatedOrderItems = _context.OrderItems.Where(oi => oi.OrderID == id);
                _context.OrderItems.RemoveRange(relatedOrderItems);

                _context.Orders.Remove(orderToDelete);

                _context.SaveChanges();


            }
            return Ok(orderToDelete);
        }

        private bool OrderExists(long id)
        {
            return _context.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}
