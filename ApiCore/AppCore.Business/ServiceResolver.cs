using AppCore.Business.Interfaces;
using AppCore.Business.Services;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AppCore.Business
{
    public static class ServiceResolver
    {
        #region Public Methods

        public static IServiceCollection RegisterServices(this IServiceCollection service)
        {
            service.AddSingleton<IProduct, ProductService>();


            return service;


        }

        #endregion Public Methods
    }
}
