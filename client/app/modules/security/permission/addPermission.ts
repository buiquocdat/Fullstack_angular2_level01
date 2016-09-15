import {Component} from "angular2/core";
import {ValidationDirective} from "../../../common/directive";
import {BasePage} from "../../../common/models/ui";
import {AddPermissionModel} from "./addPermissionModel";
import {Router} from "angular2/router";
import {UrlConfig} from "../_share/config/urlConfig";
import permissionService from "../_share/service/permissionService";

@Component({
    templateUrl: "app/modules/security/permission/addPermission.html",
    directives: [ValidationDirective]
})

export class AddPermission extends BasePage {
    public model: AddPermissionModel = new AddPermissionModel();
    private router: Router;
    constructor(router: Router){
        super();
        this.router = router;
    }

    public onSaveClicked(): void {
        let self: AddPermission = this;
        if(!this.model.inValid()){
            return;
        }
        permissionService.create(this.model).then(() => {
            self.router.navigate([UrlConfig.Permissions]);
        });
    }

    public onCancelClicked(): void {
        this.router.navigate([UrlConfig.Permissions]);
    }
}