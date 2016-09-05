import {Component} from "angular2/core";
import {PageActions, Grid} from "../../../common/directive";
import {BasePage, PageAction} from "../../../common/models/ui";
import {PermissionsModel} from "./permissionsModel";
import permissionService from "../_share/service/permissionService";

@Component({
    templateUrl: "app/modules/security/permission/permissions.html",
    directives: [PageActions, Grid]
})

export class Permissions extends BasePage{
    public model: PermissionsModel;
    constructor(){
        super();
        let self: Permissions = this;
        self.model = new PermissionsModel(self.i18nHelper);
        this.model.addAction(new PageAction("btnAddPermission", "security.permissions.addPermissionAction", () => self.onAddPermissionClicked()));
        this.loadPermissions();
    }

    private onAddPermissionClicked(): void{
        console.log("onAddPermissionClicked");
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
