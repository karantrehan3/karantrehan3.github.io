export interface Role {
  TITLE: string;
  PERIOD: string;
  DESCRIPTION: string;
}

export interface Project {
  NAME: string;
  CURRENT_NAME?: string;
  URL: string;
  ROLE: string;
  LOGO?: string;
  LOGO_ALT?: string;
  CURRENT_LOGO?: string;
  CURRENT_LOGO_ALT?: string;
  DESCRIPTION: string;
}

export interface Company {
  NAME: string;
  URL: string;
  LOGO?: string;
  LOGO_ALT?: string;
  ADDITIONAL_LOGO?: string;
  ADDITIONAL_LOGO_ALT?: string;
  SUBTITLE?: string;
  ROLES: Role[];
  PROJECTS?: Project[];
}
