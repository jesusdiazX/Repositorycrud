using Models.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore.Business.Interfaces
{
 public   interface IProduct
    {

        IEnumerable<object> GetProductos();
        object PostProductos(Product model);
        object DeteleProductos(int id);
        object PutProductos(Product model);
    }
}
