<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="WebApplication2._Default"  %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Registration</title>
<link href="Styles/Site.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="top"><img alt="logo" src="img/1.gif" /><img alt="Registration" src="img/title.gif" /> <h1 style="display: none">Registration</h1> </div>
<div id="main">
    <ul id="left">
        <li style="background-position:0 0; color:#000;">Fill In</li>
        <li>Confirm</li>
        <li>Success</li>
    </ul>
<form action="Default.aspx" method="post" id="Regright" runat="server">
            Name:<input ID="name" name="name" runat="server" required="required" />
            <br />
            Password:<input type="password" name="password" required="required" />
            <br />
            Comfirm Password:<input type="password" name="cpassword" id="cpassword" required="required" /><br />
&nbsp;Birth Date:<select name="month"><option>1</option><option>2</option></select>月<select><option>1</option></select>日<br />
&nbsp;E-Mail:<input type="email" name="email" required="required" /><br /><br />
           
            <asp:Button ID="submit" runat="server" name="submit" onclick="submit_Click" Text="Next" />
            
</form>
</div>
<script src="Scripts/js.js" type="text/javascript"></script>
</body>
</html>
