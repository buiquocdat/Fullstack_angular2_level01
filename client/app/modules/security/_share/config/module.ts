import {IModule, Module, MenuItem} from "../../../../common/models/layout";
import {Permissions} from "../../permission/permissions";
import {AuthenticationMode} from "../../../../common/enum";
import {AddPermission} from "../../permission/addPermission";
let security: IModule = createModule();
export default security;
function createModule() {
    let module = new Module("app/modules/security", "security");
    module.menus.push(
        new MenuItem(
            "Security", "/Permissions", "fa fa-users",
            new MenuItem("Permissions", "/Permissions", "")
        )
    );
    module.addRoutes([
        { path: "/permissions", name: "Permissions", component: Permissions, data: { authentication: AuthenticationMode.Require } },
        { path: "/addPermission", name: "Add Permission", component: AddPermission, data: { authentication: AuthenticationMode.Require}} 
    ]);
    return module;
}