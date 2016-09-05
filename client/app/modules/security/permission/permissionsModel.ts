import {PageAction} from "../../../common/models/ui";
import {ResourceHelper} from "../../../common/helpers/resourceHelper";

export class PermissionsModel {
    public actions: Array<PageAction> = [];
    public options: any = {};
    public eventKey: string;
    constructor(resourceHelper: ResourceHelper) {
        let self: PermissionsModel = this;
        self.options = {
            columns: [
                { field: "name", title: resourceHelper.resolve("security.permissions.grid.columns.name"), index: 0 },
                { field: "key", title: resourceHelper.resolve("security.permissions.grid.columns.key"), index: 1 },
                { field: "description", title: resourceHelper.resolve("security.permissions.grid.columns.description"), index: 2 }
            ],
            data: [],
            enableEdit: true,
            enableDelete: true
        };
        self.eventKey = "Permissions_onLoad";
    }

    public addAction(action: PageAction): void {
        this.actions.push(action);
    }

    public import(items: Array<any>): void{
        let eventManager = window.ioc.resolve("IEventManager");
        eventManager.publish(this.eventKey, items);
    }
}