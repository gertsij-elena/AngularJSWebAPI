
using System.Collections.Generic;
using System.Linq;
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
            try
            {
                db.Items.Add(it);
                db.SaveChanges();

                return it;
            }
            catch
            {
                return null;
            }
           
        }

        // DELETE: api/Items/5
        [HttpDelete]
        [ResponseType(typeof(Item))]
        public IEnumerable<Item> DeleteItem(int id)
        {
            Item item = db.Items.Find(id);
            try
            {
                db.Items.Remove(item);
                db.SaveChanges();
                return db.Items;
            }
            catch
            {
                return null;
            }
            
        }

        //// PUT: api/Items/5
        [HttpPut]
        [ResponseType(typeof(Item))]
        public IEnumerable<Item> PutItem(int id,Item item)
        {
            Item it = db.Items.Find(id);
            try
            {
                it.Name = item.Name;
                it.Description = item.Description;
                it.Count = item.Count;
                db.SaveChanges();
                return db.Items;
            }
            catch
            {
                return null;
            }
           
           
        }
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