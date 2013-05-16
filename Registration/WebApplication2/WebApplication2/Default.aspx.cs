using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Bll;


namespace WebApplication2
{
    public partial class _Default : System.Web.UI.Page 
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            

        }

        


        protected void submit_Click(object sender, EventArgs e)
        { 
            basepage MyObject = new basepage();
            MyObject.Name = Request.Form["name"].ToString();
            MyObject.Password = Request.Form["password"].ToString();
            MyObject.Email = Request.Form["email"].ToString();
            if (check(MyObject.Password)){ 
            var re = base.Response;
            re.Redirect("http://localhost:19505/WebForm.aspx", false);
            }

        }

        protected bool check(string cici) { 
            var confirm = Request.Form["cpassword"].ToString();
            if (cici != confirm) { Response.Write("<script>alert('两次密码不一样');</script>"); return false;}
            else {return true;}
            
        }
      
}
}
