using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJSWebAPI.Models;

namespace AngularJSWebAPI.Controllers
{
    public class ItemsController : ApiController
    {
        private ItemContext db = new ItemContext();

        // GET: api/Items
        [HttpGet]
        public IEnumerable<Item> GetItems()
        {
            return db.Items;
        }

        // POST: api/Items
        [HttpPost]
        [ResponseType(typeof(Item))]
        public Item PostItem(Item item)
        {

            Item it = new Item();

            it.Name = item.Name;
            it.Description = item.Description;
            it.Count = item.Count;
            db.Items.Add(it);
            db.SaveChanges();

            return it;
        }

        // DELETE: api/Items/5
        [HttpDelete]
        [ResponseType(typeof(Item))]
        public IHttpActionResult DeleteItem(int id)
        {
            Item item = db.Items.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            db.Items.Remove(item);
            db.SaveChanges();

            return Ok(item);
        }

        //// PUT: api/Items/5
        //[HttpPut]
        //[ResponseType(typeof(void))]
        //public IEnumerable<Item> PutItem(Item item)
        //{
        //    return db.Items;
        //}
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ItemExists(int id)
        {
            return db.Items.Count(e => e.Id == id) > 0;
        }
    }

}