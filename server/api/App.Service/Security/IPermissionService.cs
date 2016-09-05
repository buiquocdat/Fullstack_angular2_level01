using System.Collections.Generic;

namespace App.Service.Security
{
    public interface IPermissionService
    {
        IList<PermissionListItem> GetPermissions();
        void DeletePermission(string itemId);
    }
}
