using AppCore.Business.Interfaces;
using Models.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;


namespace AppCore.Business.Services
{
   public class ProductService: IProduct
    {


        // string path = @"C:\Users\Jesus.Diaz\source\repos\ApiCore\ApiCore\Data\Productos.json";
        string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\Data\Productos.json");



        public IEnumerable<object> GetProductos()
        {
            List<Product> lis = new List<Product>();
           

            var json = File.ReadAllText(path);


            var jsonObj = JObject.Parse(json);
            var experienceArrary = jsonObj.GetValue("data");
            List<Product> items = JsonConvert.DeserializeObject<List<Product>>(experienceArrary.ToString());
            return items;
        
        }





        public object PostProductos(Product model)
        {
           


            var json = File.ReadAllText(path);
            var jsonObj = JObject.Parse(json);
            var experienceArrary = jsonObj.GetValue("data") as JArray;

            List<Product> items = JsonConvert.DeserializeObject<List<Product>>(experienceArrary.ToString());

            int max = 0;
            for (int i = 0; i < items.Count; i++)
            {

                if (items[i].Id > max)
                    max = items[i].Id;

            }

            model.Id = max+ 1;

            var newCompanyMember = "{ 'Id': " + model.Id + ", " +
    "                     'Model': '" + model.Model + "'," +
    "                     'Brand': '" + model.Brand + "'," +
    "                     'Descripcion': '" + model.Descripcion + "'," +
    "                     'Kilometers': '" + model.Kilometers + "'," +
    "                     'Price': '" + model.Price + "'," +
    "                     'Year': '" + model.Year + "'}";

            var newCompany = JObject.Parse(newCompanyMember);


            experienceArrary.Add(newCompany);

            jsonObj["data"] = experienceArrary;
            string newJsonResult = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj,
                                   Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText(path, newJsonResult);
            return null
                ;
        }







        public object DeteleProductos(int id)
        {
            var json = File.ReadAllText(path);

            try
            {
                var jObject = JObject.Parse(json);
                JArray experiencesArrary = (JArray)jObject["data"];

                var companyName = string.Empty;
                var companyToDeleted = experiencesArrary.FirstOrDefault(obj => obj["Id"].Value<int>() == id);

                experiencesArrary.Remove(companyToDeleted);

                string output = Newtonsoft.Json.JsonConvert.SerializeObject(jObject, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(path, output);

            }
            catch (Exception)
            {

                throw;
            }


            return null
                ;
        }



        public object PutProductos(Product model)
        {
            var json = File.ReadAllText(path);

            try
            {
                var jObject = JObject.Parse(json);
                JArray experiencesArrary = (JArray)jObject["data"];

                foreach (var company in experiencesArrary.Where(obj => obj["Id"].Value<int>() == model.Id))
                {
                    company["Model"] = model.Model;
                    company["Brand"] = model.Brand;
                    company["Descripcion"] = !string.IsNullOrEmpty(model.Descripcion) ? model.Descripcion : "";
                    company["Kilometers"] = model.Kilometers;
                    company["Price"] = model.Price;
                    company["Year"] = model.Year;

                }

                jObject["data"] = experiencesArrary;
                string output = Newtonsoft.Json.JsonConvert.SerializeObject(jObject, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText(path, output);



            }
            catch (Exception)
            {

                throw;
            }


            return null
                ;
        }




    }
}
