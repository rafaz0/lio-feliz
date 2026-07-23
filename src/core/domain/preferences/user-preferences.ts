import { ValueObject } from "../value-object";
import { UserPreferencesId, type ThemeMode, type DashboardLayout } from "./preferences-types";

export type UserPreferencesProps = {
  id: UserPreferencesId;
  userId: string;
  theme: ThemeMode;
  dashboardLayout: DashboardLayout;
  notifications: boolean;
  language: string;
};

export class UserPreferences extends ValueObject<UserPreferencesProps> {
  private constructor(props: UserPreferencesProps) {
    super(props);
  }
  static create(props: UserPreferencesProps): UserPreferences {
    return new UserPreferences(props);
  }
  get id(): UserPreferencesId {
    return this.props.id;
  }
  get userId(): string {
    return this.props.userId;
  }
  get theme(): ThemeMode {
    return this.props.theme;
  }
  get dashboardLayout(): DashboardLayout {
    return this.props.dashboardLayout;
  }
  get notifications(): boolean {
    return this.props.notifications;
  }
  get language(): string {
    return this.props.language;
  }
}
