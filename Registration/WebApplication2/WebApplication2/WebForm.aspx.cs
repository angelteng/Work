using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Bll;

namespace WebApplication2
{
    public partial class WebForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            basepage data=new basepage();
            string name = data.Name;
            string password = data.Password;
            string email = data.Email;
            Response.Write("<script>window.onload=function(){document.getElementById('name').innerHTML='" + name + "';document.getElementById('password').innerHTML='" + password + "';document.getElementById('email').innerHTML='" + email + "';}</script>");

            
        }

       
    }
}