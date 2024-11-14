import { deleteUser } from "@/data-access/users";
import { User } from "@/db/schema/users";
import { getCurrentUser } from "@/lib/session";
import { Response } from "@/types/response";
import { LoginError } from "../errors";
import { UnauthorizedError } from "@/errors/common";

export const deleteUserUseCase = async (id: string): Promise<Response<User>> => {
    const user = await getCurrentUser();
    if (!user) {
        throw new LoginError();
    }
    if (user.role !== "ADMIN") {
        throw new UnauthorizedError("Only admins can delete users.");
    }
    return await deleteUser(id);
};