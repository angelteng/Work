<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm.aspx.cs" Inherits="WebApplication2.WebForm" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>Registration</title>
<link href="Styles/Site.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="top"><img alt="logo" src="img/1.gif" /><img alt="Registration" src="img/title.gif" /> <h1 style="display: none">Registration</h1> </div>
<div id="main">
    <ul id="left">
        <li >Fill In</li>
        <li style=" background-position:0 0; color:#000;">Confirm</li>
        <li>Success</li>
    </ul>
<div id="right">
        <div>Name:<span id="name"></span></div>
        <div>Password:<span id="password"></span></div>
        <div>Birth Date:<select name="month"><option>1</option><option>2</option></select>月<select><option>1w</option></select>日</div>
        <div>E-Mail:<span id="email"></span></div>ww
        <input type="button" id="submit" value="Next" name="submit" onclick="submit_Click();" />

    </div>
</div>
<script src="Scripts/js.js" type="text/javascript"></script>
</body>
</html>
