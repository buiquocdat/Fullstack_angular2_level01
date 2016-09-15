import {ValidationException} from "../../../common/models/exception";

export class AddPermissionModel {
    public name: string = String.empty;
    public key: string = String.empty;
    public description: string = String.empty;
    public inValid(): boolean {
        let validation: ValidationException = new ValidationException();
        if(String.isNullOrWhiteSpace(this.name)){
            validation.add("security.addPermission.nameIsRequired");
        }
        if(String.isNullOrWhiteSpace(this.key)){
            validation.add("security.addPermission.keyIsRequired");
        }
        if(this.key.split(" ").length > 1){
            validation.add("security.addPermission.keyHasNotWhiteSpace");
        }
        validation.throwIfHasError();
        return !validation.hasError();
    }
}