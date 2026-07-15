import { PermissionRepository } from "./permission.repository.js";

export class PermissionService {
  private repository = new PermissionRepository();

  async hasPermission(userId: string, permission: string) {
    const user = await this.repository.getUserPermissions(userId);

    if (!user) {
      return false;
    }

    return user.roles.some((role) => role.permissions.some((p) => p.name === permission));
  }
}
