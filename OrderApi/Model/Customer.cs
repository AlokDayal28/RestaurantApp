using System.ComponentModel.DataAnnotations;

namespace OrderApi.Model
{
    public class Customer
    {
        [Key]
        public int CustomerID { get; set; }
        public string Name { get; set; }
    }
}
