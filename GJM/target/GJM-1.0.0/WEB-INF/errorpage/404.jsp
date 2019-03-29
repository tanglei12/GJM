<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/bootstrap.min.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/font-awesome.min.css" />" />

<!-- page specific plugin styles -->

<!-- text fonts -->
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/ace-fonts.css" />" />

<!-- ace styles -->
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/ace.min.css"/>" id="main-ace-style" />

<!--[if lte IE 9]><![endif]-->
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/ace-part2.min.css"  />" />

<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/ace-skins.min.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/ace/assets/css/ace-rtl.min.css" />" />

<!--[if lte IE 9]>
		  <link rel="stylesheet" href="../assets/css/ace-ie.min.css" />
		<![endif]-->

<!-- inline styles related to this page -->

<!-- ace settings handler -->
<script src="<c:url value="/resources/ace/assets/js/ace-extra.min.js"/>"></script>

<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

<!--[if lte IE 8]>
		<script src="../assets/js/html5shiv.min.js"></script>
		<script src="../assets/js/respond.min.js"></script>
		<![endif]-->
</head>
<body>
	<div class="page-content-area">
		<div class="row">
			<div class="col-xs-12">
				<!-- PAGE CONTENT BEGINS -->

				<!-- #section:pages/error -->
				<div class="error-container">
					<div class="well">
						<h1 class="grey lighter smaller">
							<span class="blue bigger-125"> <i class="ace-icon fa fa-sitemap"></i> 404
							</span> Page Not Found
						</h1>

						<hr />
						<h3 class="lighter smaller">We looked everywhere but we couldn't find it!</h3>

						<div>
							<form class="form-search">
								<span class="input-icon align-middle"> <i class="ace-icon fa fa-search"></i> <input type="text" class="search-query" placeholder="Give it a search..." />
								</span>
								<button class="btn btn-sm" type="button">Go!</button>
							</form>

							<div class="space"></div>
							<h4 class="smaller">Try one of the following:</h4>

							<ul class="list-unstyled spaced inline bigger-110 margin-15">
								<li>
									<i class="ace-icon fa fa-hand-o-right blue"></i>
									Re-check the url for typos
								</li>

								<li>
									<i class="ace-icon fa fa-hand-o-right blue"></i>
									Read the faq
								</li>

								<li>
									<i class="ace-icon fa fa-hand-o-right blue"></i>
									Tell us about it
								</li>
							</ul>
						</div>

						<hr />
						<div class="space"></div>

						<div class="center">
							<a href="javascript:history.back()" class="btn btn-grey"> <i class="ace-icon fa fa-arrow-left"></i> Go Back
							</a> <a href="#" class="btn btn-primary"> <i class="ace-icon fa fa-tachometer"></i> Dashboard
							</a>
						</div>
					</div>
				</div>

				<!-- /section:pages/error -->

				<!-- PAGE CONTENT ENDS -->
			</div>
			<!-- /.col -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /.page-content-area -->
</body>
</html>