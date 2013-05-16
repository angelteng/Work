using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bll
{
    public class basepage
    {
        protected static string _Name;
        //设置属性
        public string Name
        {
            get
            {
                return _Name;//属性的返回值
            }
            set
            {
                _Name = value;//设置属性值,value即属性的值
            }
        }

        protected static string _Password;
        //设置属性
        public string Password
        {
            get
            {
                return _Password;//属性的返回值
            }
            set
            {
                _Password = value;//设置属性值,value即属性的值
            }
        }
        protected static string _Email;
        //设置属性
        public string Email
        {
            get
            {
                return _Email;//属性的返回值
            }
            set
            {
                _Email = value;//设置属性值,value即属性的值
            }
        }
    }
}