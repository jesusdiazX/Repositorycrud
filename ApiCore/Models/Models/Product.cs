﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Models
{
 public  class Product
    {

        public int Id { get; set; }
        public string Model { get; set; }
        public string Descripcion { get; set; }
        public int Year { get; set; }
        public string Brand { get; set; }
        public int Kilometers { get; set; }
        public decimal Price { get; set; }
    }
}
