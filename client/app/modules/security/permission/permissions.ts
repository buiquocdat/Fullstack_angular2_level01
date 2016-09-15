import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {PageActions, Grid} from "../../../common/directive";
import {BasePage, PageAction} from "../../../common/models/ui";
import {PermissionsModel} from "./permissionsModel";
import permissionService from "../_share/service/permissionService";
import {UrlConfig} from "../_share/config/urlConfig";

@Component({
    templateUrl: "app/modules/security/permission/permissions.html",
    directives: [PageActions, Grid]
})

export class Permissions extends BasePage{
    public model: PermissionsModel;
    private router: Router;
    constructor(router: Router){
        super();
        let self: Permissions = this;
        this.router = router;
        self.model = new PermissionsModel(self.i18nHelper);
        this.model.addAction(new PageAction("btnAddPermission", "security.permissions.addPermissionAction", () => self.onAddPermissionClicked()));
        this.loadPermissions();
    }

    private onAddPermissionClicked(): void{
        this.router.navigate([UrlConfig.Create]);
    }

    private loadPermissions(): void{
        let self: Permissions = this;
        permissionService.getPermissions().then((perItems: Array<any>) => {
            self.model.import(perItems);
        })
    }

    private onDeletePermissionClicked(perItem: any): void{
        let self: Permissions = this;
        permissionService.remove(perItem.item.id).then(() => {
            self.loadPermissions();
        })
    }
}
