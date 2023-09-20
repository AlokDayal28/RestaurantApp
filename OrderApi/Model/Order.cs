using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OrderApi.Model
{
    public class Order
    {
        [Key]
        public long OrderID { get; set; }
        public string OrderNo { get; set; }
        public int CustomerID { get; set; }
        public string PMethod { get; set; }
        public Nullable<decimal> GTotal { get; set; }

        [NotMapped]
        public string DeletedOrderItemIDs { get; set; }
        
        [NotMapped]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
