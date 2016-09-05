import {JsonHeaders} from "../../../../common/models/http";
import configHelper from "../../../../common/helpers/configHelper";

let permissionService = {
    getPermissions: getPermissions,
    remove: remove
};

export default permissionService;

function getPermissions(){
    let connector = window.ioc.resolve("IConnector");
    let url = String.format("{0}/permissions", configHelper.getAppConfig().api.baseUrl);
    let jsonHeaders = new JsonHeaders();
    return connector.get(url, jsonHeaders);
}

function remove(itemId: any){
    let connector = window.ioc.resolve("IConnector");
    let url = String.format("{0}/permissions/{1}", configHelper.getAppConfig().api.baseUrl, itemId);
    let jsonHeaders = new JsonHeaders();
    return connector.delete(url, jsonHeaders);
}