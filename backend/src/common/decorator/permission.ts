import { SetMetadata } from "@nestjs/common"
import { PERMISSION_KEY } from "../constant/constant.js"

export const Permission = (...permission: string[]) => {
    return SetMetadata(PERMISSION_KEY, permission)
}