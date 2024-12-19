/*
 * Copyright (c) 2019, InetSoft Technology Corp, All Rights Reserved.
 *
 * The software and information contained herein are copyrighted and
 * proprietary to InetSoft Technology Corp. This software is furnished
 * pursuant to a written license agreement and may be used, copied,
 * transmitted, and stored only in accordance with the terms of such
 * license and with the inclusion of the above copyright notice. Please
 * refer to the file "COPYRIGHT" for further copyright and licensing
 * information. This software and information or any other copies
 * thereof may not be provided or otherwise made available to any other
 * person.
 */
package inetsoft.sree;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequestWrapper;

import inetsoft.sree.ClientInfo;
import inetsoft.sree.RepletRepository;
import inetsoft.sree.security.SRPrincipal;

public class SampleFilter implements Filter {
   @Override
   public void init(FilterConfig config) throws ServletException {
   }

   @Override
   public  void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
  	throws IOException, ServletException
   {
  	HttpServletRequest httpRequest = (HttpServletRequest) request;
  	HttpSession session = httpRequest.getSession(true);

  	/* Code below can be replaced by your own business logic to determine the
     	correct InetSoft User and create a new instance of the SRPrincipal Object.
     	In this case, the parameter value is passed as the name "USERID".
     	The simple logic used to create the SRPrincipal Object is for documentation
     	purposes only and should not be used in a production environment.

     	If the request does not contain the "USERID" parameter (lines 62-65),
     	continue on with the filter chain, which will:
     	a. Check if the SRPrincipal is found in the "session" or
     	b. Prompt the user to login into the InetSoft long-in page.
  	*/

  	String userId = httpRequest.getParameter("USERID");

  	if(userId == null ) {
     	chain.doFilter(httpRequest, response);
     	return;
  	}

  	SRPrincipal principal = new SRPrincipal(userId);

  	/* Once the Principal object is created, we need to:
     	a. Set the principal in the session (line 74).
     	b. Place it in the request wrapper (lines 76-81).
  	*/

  	session.setAttribute(RepletRepository.PRINCIPAL_COOKIE, principal);

  	HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(httpRequest) {
     	@Override
     	public Principal getUserPrincipal() {
        	return principal;
     	}
  	};

  	chain.doFilter(wrapper, response);
   }

   @Override
   public void destroy() {
   }
}