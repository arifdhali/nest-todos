import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, context: ExecutionContext) => {
    let req = context.switchToHttp().getRequest();
     return req.user;
});
