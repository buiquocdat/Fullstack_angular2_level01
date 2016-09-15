using App.Common.DI;
using App.Repository.Security;
using App.Service.Security;
using System.Collections.Generic;
using System;
using App.Common.Validation;
using App.Common.Data;
using App.Context;
using App.Common;
using App.Entity.Security;

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

        public void CreatePermission(CreatePermissionRequest request)
        {
            ValidationForCreate(request);
            using(IUnitOfWork uow = new UnitOfWork(new AppDbContext(IOMode.Write)))
            {
                IPermissionRepository perRepo = IoC.Container.Resolve<IPermissionRepository>(uow);
                Permission per = new Permission(request.Name, request.Key, request.Description);
                perRepo.Add(per);
                uow.Commit();
            }
        }

        private void ValidationForCreate(CreatePermissionRequest request)
        {
            IPermissionRepository perRepo = IoC.Container.Resolve<IPermissionRepository>();
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                throw new ValidationException("security.addPermission.nameIsRequired");
            }
            if (string.IsNullOrWhiteSpace(request.Key))
            {
                throw new ValidationException("security.addPermission.keyIsRequired");
            }
            if (request.Key.Contains(" "))
            {
                throw new ValidationException("security.addPermission.keyHasNotWhiteSpace");
            }
            if (perRepo.GetByName(request.Name) != null)
            {
                throw new ValidationException("security.addPermission.nameWasExists");
            }
            if (perRepo.GetByKey(request.Key) != null)
            {
                throw new ValidationException("security.addPermission.keyWasExists");
            }
        }
    }
}
