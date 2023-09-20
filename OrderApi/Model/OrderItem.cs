using System.ComponentModel.DataAnnotations;

namespace OrderApi.Model
{
    public class OrderItem
    {
        [Key]     
        public long OrderItemID { get; set; }
        public long OrderID { get; set; }
        public int ItemID { get; set; }
        public Nullable<int> Quantity { get; set; }
    }
}
