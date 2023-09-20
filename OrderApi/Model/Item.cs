using System.ComponentModel.DataAnnotations;

namespace OrderApi.Model
{
    public class Item
    {
        [Key]
        public int ItemID { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Price { get; set; }
    }
}
