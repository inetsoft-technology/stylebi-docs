package inetsoft.test.core

import inetsoft.sree.security.IdentityID
import inetsoft.sree.security.SRPrincipal
import inetsoft.util.Tool

class TUtil {
   /**
    * create a user principal
    * @param userName user name
    * @param roles  the roles of user
    * @param groups  the groups of user
    * @return
    */
   static SRPrincipal createPrincipal(String userName, String[] roles, String[] groups) {
      IdentityID identityUser = new IdentityID(userName, 'host-org')
      IdentityID[] identityRoles = new IdentityID[0]
      roles.each { role ->
         IdentityID newRole = role != 'Administrator' ? new IdentityID(role, 'host-org'): new IdentityID(role, null)
         newRole.setName(role)
         identityRoles += newRole
      }
      return new SRPrincipal(identityUser, identityRoles, groups, 'host-org', Tool.getSecureRandom().nextLong())
   }

}
