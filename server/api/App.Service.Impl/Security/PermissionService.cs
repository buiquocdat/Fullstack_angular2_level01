using App.Common.DI;
using App.Repository.Security;
using App.Service.Security;
using System.Collections.Generic;
using System;
using App.Common.Validation;
using App.Common.Data;
using App.Context;
using App.Common;

namespace App.Service.Impl.Security
{
    public class PermissionService : IPermissionService
    {
        public void DeletePermission(string itemId)
        {
            ValidationForDelete(itemId);
            using(IUnitOfWork uow = new UnitOfWork(new AppDbContext(IOMode.Write)))
            {
                IPermissionRepository perRepo = IoC.Container.Resolve<IPermissionRepository>(uow);
                perRepo.Delete(itemId);
                uow.Commit();
            }
        }

        private void ValidationForDelete(string itemId)
        {
            if (string.IsNullOrWhiteSpace(itemId))
            {
                throw new ValidationException("security.deletePermission.invalid");
            }
            Guid id;
            if(!Guid.TryParse(itemId, out id))
            {
                throw new ValidationException("security.deletePermission.invalid");
            }
        }

        public IList<PermissionListItem> GetPermissions()
        {
            IPermissionRepository perRepo = IoC.Container.Resolve<IPermissionRepository>();
            return perRepo.GetItems<PermissionListItem>();
        }
    }
}
