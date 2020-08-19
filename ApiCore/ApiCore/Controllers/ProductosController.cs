using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AppCore.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using Newtonsoft.Json;

namespace ApiCore.Controllers
{
    [Route("api/[controller]")]
    public class ProductosController : Controller
    {

        private readonly IProduct product;
        public ProductosController( IProduct _service)
        {
            product = _service;
        }

        

        [HttpGet("[action]")]
        public JsonResult getProductos()
     {
            var data = product.GetProductos();
            

            return Json(data);
        }



        [HttpPost("[action]")]
        public JsonResult PostProductos([FromBody] Product model)
        {
            var data = product.PostProductos(model);
        

            return Json(data);
        }

        [HttpPut("[action]")]
        public JsonResult putProductos([FromBody] Product model)
        {
            var data = product.PutProductos(model);


            return Json(data);
        }

        [HttpDelete("[action]")]
        public JsonResult DelteProductos(int id)
        {
            var data = product.DeteleProductos(id);


            return Json(data);
        }


    }
}
