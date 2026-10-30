import { SetMetadata } from "@nestjs/common"
import { ROLES_KEY } from "../constant/constant.js"
export const Roles = (...roles: string[]) => {
    return SetMetadata(ROLES_KEY, roles)
}