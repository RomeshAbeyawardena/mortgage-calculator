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
        [HttpGet, Route("/"), ResponseCache(Duration = 86400, VaryByHeader = "User-Agent")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("/Data")]
        public IActionResult GetData()
        {
            return Ok(new [] { 
                new PropertyDetailsViewModel { PropertyReference = "AA434323", PropertyPrice = 115000 },
                new PropertyDetailsViewModel { PropertyReference = "DA645353", PropertyPrice = 248000 },
                new PropertyDetailsViewModel { PropertyReference = "MA754723", PropertyPrice = 339780 },
                new PropertyDetailsViewModel { PropertyReference = "FA343443", PropertyPrice = 447500 },
            });
        }

        [HttpGet, Route("/GetMonthlyCost")]
        public IActionResult GetMonthlyCost(PropertyDetailsViewModel model)
        {
            var accumalatedInterest = model.PropertyPrice ?? model.Amount * (model.InterestRate / 100);
            var totalCost = ((model.PropertyPrice ?? model.Amount + accumalatedInterest) - model.Deposit) / model.RepaymentPeriod / 12;

            return Ok(new { 
                TotalCost = totalCost, 
                AccumalatedInterest = accumalatedInterest / model.RepaymentPeriod
            });
        }
    }
}
