using System.Web.Http;
using System.Net.Http.Headers;

namespace AngularJSWebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Маршруты веб-API
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
               name: "ApiByActionAndId",
               routeTemplate: "api/{controller}/{action}/{id}",
               defaults: new { action = "Get" }
            );
        }
    }
}
