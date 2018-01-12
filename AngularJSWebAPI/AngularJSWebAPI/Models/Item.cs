using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace AngularJSWebAPI.Models
{
    public class Item
    {
        [Key]
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [Display(Name = "Name")]
        [Required(ErrorMessage = "Поле обязательно")]
        [StringLength(50, ErrorMessage = "Длина не должна превышать 50 символов")]
        public string Name { get; set; }

        [Display(Name = "Description")]
        [Required(ErrorMessage = "Поле обязательно")]
        [StringLength(512, ErrorMessage = "Длина не должна превышать 512 символов")]
        public string Description { get; set; }

        [Display(Name = "Count")]
        [Required(ErrorMessage = "Поле обязательно")]
        public int Count { get; set; }
    }
}