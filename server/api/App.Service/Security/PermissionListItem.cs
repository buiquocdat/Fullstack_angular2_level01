using App.Common.Data;
using App.Common.Mapping;
using App.Entity.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Service.Security
{
    public class PermissionListItem : BaseContent, IMappedFrom<Permission>
    {
    }
}
