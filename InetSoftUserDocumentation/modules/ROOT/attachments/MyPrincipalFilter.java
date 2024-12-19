package com.mycompany;

import java.io.IOException;
import java.security.SecureRandom;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import inetsoft.sree.ClientInfo;
import inetsoft.sree.security.SRPrincipal;

import com.thirdparty.SsoPrincipal;

public class MyPrincipalFilter implements Filter {
    private SecureRandom random;
    
    @Override
    public void init(FilterConfig config) throws ServletException {
        try {
            random = SecureRandom.getInstanceStrong();
        }
        catch(Exception e) {
            throw new ServletException("Failed to get secure random instance", e);
        }
    }
    
    @Override
    public abstract void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        SsoPrincipal ssoPrincipal = (SsoPrincipal) httpRequest.getUserPrincipal();
        
        String username = ssoPrincipal.getName();
        String[] roles = ssoPrincipal.getRoles();
        boolean admin = ssoPrincipal.isUserInRole("ADMINISTRATOR");
        String address = ssoPrincipal.getRemoteAddress();
        long id = random.nextLong();
        
        ClientInfo info = new ClientInfo(username, address);
        SRPrincipal principal = new SRPrincipal(info, roles, id);
        
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