using Microsoft.AspNetCore.Mvc;
using mortgage_calculator.Shared.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mortgage_calculator.Web.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet, Route("/")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("/Data")]
        public IActionResult GetData()
        {
            return Ok(new [] { 
                new PropertyDetailsViewModel { PropertyPrice = 115000 },
                new PropertyDetailsViewModel { PropertyPrice = 248000 },
                new PropertyDetailsViewModel { PropertyPrice = 339780 },
                new PropertyDetailsViewModel { PropertyPrice = 447500 },
            });
        }

        [HttpGet, Route("/GetMonthlyCost")]
        public IActionResult GetMonthlyCost(PropertyDetailsViewModel model)
        {
            var totalCost = (model.PropertyPrice ?? model.Amount - model.Deposit) / model.RepaymentPeriod / 12;
            return Ok(totalCost);
        }
    }
}
