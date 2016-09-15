using App.Common.DI;
using App.Common.Http;
using App.Common.Validation;
using App.Service.Security;
using System.Collections.Generic;
using System.Web.Http;

namespace App.Api.Features.Security
{
    [RoutePrefix("api/permissions")]
    public class PermissionsController : ApiController
    {
        [Route("")]
        [HttpGet]
        public IResponseData<IList<PermissionListItem>> GetPermissions()
        {
            IResponseData<IList<PermissionListItem>> response = new ResponseData<IList<PermissionListItem>>();
            try
            {
                IPermissionService perSerivce = IoC.Container.Resolve<IPermissionService>();
                IList<PermissionListItem> items = perSerivce.GetPermissions();
                response.SetData(items);
            }   
            catch (ValidationException ex)
            {
                response.SetStatus(System.Net.HttpStatusCode.PreconditionFailed);
                response.SetErrors(ex.Errors);
            }
            return response;
        }

        [Route("{itemId}")]
        [HttpDelete]
        public IResponseData<string> DeletePermissions([FromUri]string itemId)
        {
            IResponseData<string> response = new ResponseData<string>();
            try
            {
                IPermissionService perSerivce = IoC.Container.Resolve<IPermissionService>();
                perSerivce.DeletePermission(itemId);
            }
            catch (ValidationException ex)
            {
                response.SetStatus(System.Net.HttpStatusCode.PreconditionFailed);
                response.SetErrors(ex.Errors);
            }
            return response;
        }

        [Route("")]
        [HttpPost]
        public IResponseData<string> CreatePermissions([FromBody]CreatePermissionRequest request)
        {
            IResponseData<string> response = new ResponseData<string>();
            try
            {
                IPermissionService perSerivce = IoC.Container.Resolve<IPermissionService>();
                perSerivce.CreatePermission(request);
            }
            catch (ValidationException ex)
            {
                response.SetStatus(System.Net.HttpStatusCode.PreconditionFailed);
                response.SetErrors(ex.Errors);
            }
            return response;
        }
    }
}
