using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mortgage_calculator.Shared.Domain.ViewModels
{
    public class PropertyDetailsViewModel
    {
        public decimal? Amount { get; set; }
        public decimal? PropertyPrice { get; set; }
        public decimal Deposit { get; set; }
        public decimal InterestRate { get; set; }
        public int RepaymentPeriod { get; set; }
    }
}
